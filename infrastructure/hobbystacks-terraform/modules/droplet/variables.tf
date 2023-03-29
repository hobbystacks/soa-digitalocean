################################################################################
# [Required Variables]
################################################################################
variable "ssh_public_key" {
  description = "Name of your SSH Key as it appears in the DigitalOcean dashboard."
  type        = string
  sensitive   = true
}

variable "ssh_private_key" {
  description = "Path to the SSH Key used for the connections."
  type        = string
  sensitive   = true
}

variable "project_name" {
  description = "Name of your project."
  type        = string
}

variable "droplet_name" {
  description = "Name of your Droplet."
  type        = string
}

variable "vpc_uuid" {
  description = "UUID of the VPC holding the droplets."
  type        = string
}

################################################################################
# [Optional Variables]
################################################################################
variable "droplet_image" {
  # Reference: https://slugs.do-api.dev/
  description = "The operating system image we want to use."
  type        = string
  default     = "ubuntu-22-04-x64"
}

variable "droplet_region" {
  # Reference: https://slugs.do-api.dev/
  description = "The region to deploy our infrastructure to."
  type        = string
  default     = "nyc1"
}

variable "droplet_size" {
  # Reference: https://slugs.do-api.dev/
  description = "The size we want our droplets to be."
  type        = string
  default     = "s-1vcpu-512mb-10gb"
}
