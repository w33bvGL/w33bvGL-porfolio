FROM php:8.2-fpm

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    git \
    apt-utils \
    libpq-dev \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    libcurl4-openssl-dev \
    libbz2-dev \
    libmemcached-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libxpm-dev \
    libicu-dev \
    libxml2-dev \
    libjpeg-dev \
    libgd-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN docker-php-ext-install pdo_mysql bcmath gd zip curl bz2 soap sockets \
    && pecl install redis \
    && docker-php-ext-enable soap redis

COPY --from=composer:2.4 /usr/bin/composer /usr/bin/composer

COPY .docker/php.ini /usr/local/etc/php/conf.d/php.ini

WORKDIR /var/www

COPY . .

RUN composer install

RUN php artisan key:generate

RUN mkdir -p /var/www/storage /var/www/bootstrap/cache \
    && chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
