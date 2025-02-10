import * as cluster from 'cluster';
import { cpus } from 'os';
import { Injectable } from '@nestjs/common';

// 시스템의 CPU 정보를 가져와 CPU 코어의 개수를 저장
const numCPUs = cpus().length;
export const clusterModule = cluster as unknown as cluster.Cluster;
@Injectable()
export class AppClusterService {
    // clusterize 메서드는 주어진 콜백 함수를 실행하며 클러스터를 설정
    static clusterize(callback: Function): void {
        /*isPrimary 속성을 사용하여 연해 프로세스가 마스터 프로세스인지 확인
        마스터 프로세스는 클러스터 생성 및 관리를 담당하고 워커 프로세스는 실제 작업을 수행*/
        if(clusterModule.isPrimary){
            console.log(`Master server started on ${process.pid}`);
            for (let i = 0; i < numCPUs; i++) {
                clusterModule.fork();
            }
            clusterModule.on('exit', (worker, code, signal) => {
                console.log(`Worker ${worker.process.pid} died. Restarting`);
                clusterModule.fork();
            })
        } else {
            console.log(`Cluster server started on ${process.pid}`)
            callback();
        }
    }
}