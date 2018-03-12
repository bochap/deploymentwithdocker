FROM nginx:latest
# Make sure we are fully up to update
RUN apt-get update -q && \
    apt-get dist-upgrade -y && \
    apt-get install openssl && \
    apt-get clean && \
    apt-get autoclean

EXPOSE 8080

# Setup any variables we need
ENV SRV_PATH /srv/www/html

# Get a variable defined for our password
ARG PASSWORD=test

# Remove default configuration
RUN rm /etc/nginx/conf.d/default.conf

COPY start_nginx.sh /usr/local/bin/

# Change ownership of copied files, Setup authentication file
RUN mkdir -p $SRV_PATH && \
    chown nginx:nginx $SRV_PATH && \
    printf "user:$(openssl passwd -crypt $PASSWORD)\n" >> $SRV_PATH/.htpasswd && \
    chmod +x /usr/local/bin/start_nginx.sh

# Add our own configuration file
COPY nginx_main_site.conf.template /etc/nginx/conf.d/

CMD ["/usr/local/bin/start_nginx.sh"]