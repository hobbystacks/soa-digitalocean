########################################################################################
# Create and initialize the new droplet.
########################################################################################
locals {
  script_directory = "${path.module}/scripts/"
  docker_directory = "${path.module}/docker-nginx/"

  # Extracted ip ranges are from Microsoft's weekly list as per their documentation.
  # SOURCE: https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops&tabs=yaml#networking
  azure_cloud_public_ip_ranges = "${path.module}/azure-cloud-public-ip-ranges.json"
}

data "digitalocean_ssh_key" "main" {
  name = var.ssh_public_key
}

resource "digitalocean_droplet" "web" {
  count = 1

  name   = "${var.project_name}-${var.droplet_name}-${var.droplet_region}-${count.index + 1}"
  image  = var.droplet_image
  region = var.droplet_region
  size   = var.droplet_size
  ssh_keys = [
    data.digitalocean_ssh_key.main.id
  ]
  vpc_uuid = var.vpc_uuid

  tags = [
    "${var.project_name}-webserver",
    "${var.project_name}"
  ]

  connection {
    host        = self.ipv4_address
    user        = "root"
    type        = "ssh"
    private_key = file(var.ssh_private_key)
    timeout     = "2m"
  }

  provisioner "remote-exec" {
    inline = [
      "mkdir -p /tmp/scripts/",
      "mkdir -p /var/www/apps",
    ]
  }

  provisioner "file" {
    source      = local.script_directory
    destination = "/tmp/scripts/"
  }

  provisioner "file" {
    source      = local.docker_directory
    destination = "/var/www/apps"
  }

  provisioner "remote-exec" {
    inline = [
      "bash /tmp/scripts/server-setup.sh"
    ]
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "digitalocean_firewall" "web" {
  name = "only-22-80-and-443"

  droplet_ids = digitalocean_droplet.web[*].id

  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    # source_addresses = ["192.168.1.0/24", "2002:1:2::/48"]
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "5432"
    source_addresses = jsondecode(file(local.azure_cloud_public_ip_ranges))
  }

  outbound_rule {
    protocol         = "tcp"
    port_range       = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}

########################################################################################
# Associate the resources with the specified project.
########################################################################################
# data "digitalocean_project" "main" {
#   name = var.project_name
# }

# resource "digitalocean_project_resources" "main" {
#   project = data.digitalocean_project.main.id
#   resources = [
#     digitalocean_droplet.web[*].urn
#   ]
# }
