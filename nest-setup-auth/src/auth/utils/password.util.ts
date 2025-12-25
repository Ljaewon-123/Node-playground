import { pbkdf2Sync, randomBytes } from 'crypto';

export class PasswordHasher {
  // 비밀번호 해싱
  static hash(password: string): string {
    const salt = randomBytes(16).toString('hex'); // 매번 다른 솔트 생성
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`; // 솔트와 해시를 함께 저장
  }

  // 비밀번호 비교
  static compare(password: string, storedValue: string): boolean {
    const [salt, storedHash] = storedValue.split(':');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === storedHash;
  }
}