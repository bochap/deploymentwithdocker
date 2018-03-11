FROM nginx:latest

# Make sure we are fully up to date
RUN apt-get update -q && apt-get dist-upgrade -y

# Remove the default configuration
RUN rm /etc/nginx/conf.d/default.conf

# Create our website's directory and make sure
# that the webserver process can read it
RUN mkdir -p /srv/www/html && chown nginx:nginx /srv/www/html

# Copy custom server configuration onto image
COPY nginx_main_site.conf /etc/nginx/conf.d/

# Copy test file into the image website folder
COPY test.txt /srv/www/html/
