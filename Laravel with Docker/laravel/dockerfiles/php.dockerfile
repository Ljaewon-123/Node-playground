# 베이스 이미지가 php 인터프리터 호출

FROM php:8.2-fpm-alpine

# 최종 app보관 폴더 nginx참조
WORKDIR /var/www/html

COPY src .

# php 확장
RUN docker-php-ext-install pdo pdo_mysql

RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel

USER laravel

# 퍼미션 디나이 에러 
RUN chown -R www-data:www-data /var/www/html