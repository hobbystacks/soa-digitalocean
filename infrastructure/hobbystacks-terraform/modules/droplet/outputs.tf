output "droplet_urns" {
  value = digitalocean_droplet.web.*.urn
}

output "droplet_ips" {
  value = digitalocean_droplet.web.*.ipv4_address
}
