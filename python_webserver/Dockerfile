FROM python:3

# Add some labels for cache busting and annotating
LABEL version="1.0"
LABEL com.oredi.dwdpw="python-webserver"

# Set a variable that we will keep reusing to prevent typos
ENV SRV_PATH=/srv/www/html
ENV SRV_UID_GID=pythonsrv

# Make sure we are fully up to date
RUN apt-get update -q && apt-get dist-upgrade -y

# Let docker know that the exposed port we will use is 8000
EXPOSE 8000

# Create our website's directory, then create a limited user and group
RUN mkdir -p $SRV_PATH && groupadd -r -g 350 $SRV_UID_GID && useradd -r -m -u 350 -g 350 $SRV_UID_GID

# Define ./external as an externally-mounted directory
VOLUME $SRV_PATH/external

# To serve things up with python, we need to be in that same directory
WORKDIR $SRV_PATH

# Copy our test files
COPY test.txt $SRV_PATH/

# Add a URL-hosted content into the image
ADD https://avatars2.githubusercontent.com/u/637249?s=200&v=4 $SRV_PATH/

# Make sure that we can read all of these files as a limited useradd
RUN chown -R $SRV_UID_GID:$SRV_UID_GID $SRV_PATH

# USE a limited user to run the container
USER $SRV_UID_GID

# Run the simple http python server to serve up the content
CMD [ "python3", "-m", "http.server" ]
