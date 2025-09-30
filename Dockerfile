# Use the official PHP image.
# https://hub.docker.com/_/php
FROM php:8.4-apache

RUN a2enmod rewrite
# Enable Apache mod_rewrite and allow .htaccess overrides
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# get Arguments
ARG PORT=8080
ARG PHP_INI_DIR=/usr/local/etc/php

# Copy in custom code from the host machine.
WORKDIR /var/www/html
COPY . ./

# Ensure the webserver has permissions to execute index.php
RUN chown -R www-data:www-data /var/www/html

# Use the PORT environment variable in Apache configuration files.
# https://cloud.google.com/run/docs/reference/container-contract#port
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Configure PHP for development.
# Switch to the production php.ini for production operations.
# RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
# https://github.com/docker-library/docs/blob/master/php/README.md#configuration
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
