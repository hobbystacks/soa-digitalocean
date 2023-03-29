resource "digitalocean_project" "main" {
  name      = var.name
  resources = var.resource_urns
  # description = var.description
  # purpose     = var.purpose
  # environment = var.environment
}
