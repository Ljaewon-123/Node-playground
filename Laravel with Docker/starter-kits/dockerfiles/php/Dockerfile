FROM php:8.2-fpm

# 시스템 패키지 설치
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    zip \
    unzip \
    nodejs \
    npm

# PHP 확장 설치
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip

# Composer 설치
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 작업 디렉토리
WORKDIR /var/www/html

# 사용자 생성 (권한 문제 해결)
RUN groupadd -g 1000 laravel && \
    useradd -u 1000 -g laravel -m laravel

RUN chown -R laravel:laravel /var/www/html
USER laravel

# # 퍼미션 디나이 에러 
# RUN chown -R www-data:www-data /var/www/html

