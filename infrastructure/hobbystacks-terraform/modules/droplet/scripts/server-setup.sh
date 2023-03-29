#!/bin/bash

# Source: https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-22-04
# Source: https://github.com/jasonheecs/ubuntu-server-setup

set -e

# - (Optional) Adds a user account with sudo access
# - (Optional) Adds a public ssh key for the new user account
# - (Default) Disables password authentication to the server
# - Setup Uncomplicated Firewall (UFW)
# - Update installed packages (apt-get update)
# - (Optional) Install git
# - Install Docker and Docker-Compose (apt-get install ...)
# - Launch Docker-Compose with Nginx
# - Test connection with Nginx from local device

# 1. Install Docker
apt update
apt -y install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt-cache policy docker-ce
apt -y install docker-ce
# "usermod -aG docker ${USER}
docker -v

# 2. Install Docker Compose
mkdir -p ~/.docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/download/v2.3.3/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose
docker compose version

# 3. Start Nginx Reverse Proxy
docker compose -f /var/www/apps/docker-compose.yml up -d
