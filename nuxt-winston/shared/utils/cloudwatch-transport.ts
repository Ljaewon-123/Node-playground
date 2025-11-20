import TransportStream from 'winston-transport';
import {
  CloudWatchLogsClient,
  PutLogEventsCommand,
  DescribeLogStreamsCommand,
  CreateLogStreamCommand,
  type PutLogEventsCommandOutput,
} from '@aws-sdk/client-cloudwatch-logs';

type LoggerLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';
type AwsConfig = { credentials: Credentials }
type Credentials = { accessKeyId: string, secretAccessKey: string }

// Winston용 사용자 정의 transport 클래스
export class CloudWatchTransport extends TransportStream {
  private client: CloudWatchLogsClient;
  private sequenceToken?: string;
  private isInitialized = false;

  constructor(private options: {
    logGroupName: string;
    logStreamName: string;
    region: string;
    level: LoggerLevel,
    awsConfig?: AwsConfig; // AWS 설정 추가 옵션
  }) {
    super({ level: options.level ?? 'error' }); // ❗ 지정 레벨 이상 전송 
    // AWS 클라이언트 초기화 - 추가 설정 가능
    this.client = new CloudWatchLogsClient({
      region: options.region,
      ...options.awsConfig,
    });
  }

  // 로그 스트림 초기화 (한 번만 실행)
  private async initializeLogStream(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // 정확한 스트림 이름으로 검색
      const { logStreams } = await this.client.send(
        new DescribeLogStreamsCommand({
          logGroupName: this.options.logGroupName,
          logStreamNamePrefix: this.options.logStreamName,
        }),
      );

      // 정확히 일치하는 스트림 찾기
      const exactStream = logStreams?.find(
        stream => stream.logStreamName === this.options.logStreamName
      );

      if (exactStream) {
        // 기존 스트림의 시퀀스 토큰 사용
        this.sequenceToken = exactStream.uploadSequenceToken;
      } else {
        // 스트림이 없으면 새로 생성
        await this.client.send(new CreateLogStreamCommand({
          logGroupName: this.options.logGroupName,
          logStreamName: this.options.logStreamName,
        }));
        // 새 스트림은 시퀀스 토큰이 없음
        this.sequenceToken = undefined;
      }

      this.isInitialized = true;
    } catch (error) {
      console.error('CloudWatch 스트림 초기화 실패:', error);
      throw error;
    }
  }

  // 실제 로그를 처리하는 메서드
  override async log(info: any, callback: () => void) {

    try {
      // 스트림 초기화 (첫 번째 로그에서만 실행됨)
      await this.initializeLogStream();

      const { message, level, timestamp, ...meta } = info;

      // 로그 이벤트 생성
      const logEvent = {
        timestamp: Date.now(),
        message: JSON.stringify({
          level,
          message,
          timestamp,
          ...meta,
        }),
      };

      // PutLogEvents 명령 생성
      const command = new PutLogEventsCommand({
        logGroupName: this.options.logGroupName,
        logStreamName: this.options.logStreamName,
        logEvents: [logEvent],
        sequenceToken: this.sequenceToken,
      });

      // CloudWatch에 로그 전송
      const response: PutLogEventsCommandOutput = await this.client.send(command);

      // 다음 요청을 위해 시퀀스 토큰 업데이트
      this.sequenceToken = response.nextSequenceToken;

      // 거부된 로그 이벤트가 있다면 로그 출력
      if (response.rejectedLogEventsInfo) {
        console.warn('CloudWatch 로그 거부됨:', response.rejectedLogEventsInfo);
      }

    } catch (error: any) {
      console.error('CloudWatch 로그 전송 실패:', {
        error: error.message,
        name: error.name,
        logGroup: this.options.logGroupName,
        logStream: this.options.logStreamName,
        sequenceToken: this.sequenceToken,
      });
      
      // 시퀀스 토큰 관련 오류인 경우 재초기화
      if (
        error.name === 'InvalidSequenceTokenException' || 
        error.name === 'DataAlreadyAcceptedException'
      ) {
        console.log('시퀀스 토큰 오류로 인한 재초기화');
        this.isInitialized = false;
        this.sequenceToken = undefined;
      }
    }

    callback();
  }
}