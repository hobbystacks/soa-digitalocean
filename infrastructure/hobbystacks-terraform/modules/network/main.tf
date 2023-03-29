resource "digitalocean_vpc" "main" {
  name     = "${var.vpc_name}-${var.vpc_region}"
  region   = var.vpc_region
  ip_range = var.vpc_ip_range
}
