resource "digitalocean_domain" "public" {
  name = var.domain_name
}

resource "digitalocean_record" "public-web-main" {
  domain = digitalocean_domain.public.name
  type   = "A"
  name   = "@"
  value  = var.droplet_web_main_ip_address
}