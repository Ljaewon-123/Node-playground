# --- Stage 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# --- Stage 2: Run ---
FROM node:20-alpine

WORKDIR /usr/src/app

# 보안을 위해 시스템 환경변수 설정
ENV NODE_ENV=production

# 빌드 결과물과 필요한 설정파일만 복사
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# 운영 환경에 필요한 라이브러리만 설치 (devDependencies 제외)
RUN npm install --only=production

# 권한 제한 (root 사용자가 아닌 node 사용자 권한으로 실행)
USER node

EXPOSE 3000

CMD ["node", "dist/main"]