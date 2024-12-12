FROM php:8.2-fpm

# Установка необходимых пакетов
RUN apt-get update && apt-get install -y \
    apt-utils \
    libpq-dev \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    gnupg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Установка PHP расширений
RUN docker-php-ext-install pdo_mysql bcmath gd zip

# Установка Redis для PHP
RUN pecl install redis \
    && docker-php-ext-enable redis

# Копирование php.ini
COPY ./_docker/prod/php.ini /usr/local/etc/php/conf.d/php.ini

# Установка Composer
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Установка Node.js и npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Установка рабочей директории
WORKDIR /var/www

# Создание папок для Laravel
RUN mkdir -p /var/www/storage /var/www/bootstrap/cache

# Настройка прав для Laravel
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

RUN chmod -R 775 storage
RUN chown -R www-data:www-data storage

RUN chmod -R 777 /var/www/storage /var/www/bootstrap/cache
RUN mkdir -p /var/www/storage/logs \
    && touch /var/www/storage/logs/laravel.log

# Команда по умолчанию
CMD ["php-fpm"]
