FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    openssl \
    git \
    libssl-dev \
    pkg-config \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    libbrotli-dev \
    curl \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd xml \
    && pecl install redis \
    && pecl install mongodb \
    && docker-php-ext-enable redis mongodb

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY _docker/php.ini /usr/local/etc/php/

WORKDIR /var/www

COPY . .

RUN composer install --no-cache

RUN php artisan key:generate

RUN vendor/bin/phpunit --configuration phpunit.xml --stop-on-failure

RUN chown -R www-data:www-data /var/www

EXPOSE 8000
