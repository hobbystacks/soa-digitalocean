################################################################################
# [Required Variables]
################################################################################
variable "do_token" {
  description = "DigitalOcean API token."
  type        = string
  sensitive   = true
}

variable "do_ssh_public_key" {
  description = "Name of your SSH Key as it appears in the DigitalOcean dashboard."
  type        = string
  sensitive   = true
}

variable "do_ssh_private_key" {
  description = "Path to the SSH Key used for the connections."
  type        = string
  sensitive   = true
}

variable "jfrog_token" {
  description = "JFrog API token."
  type        = string
  sensitive   = true
}

################################################################################
# [Optional Variables]
################################################################################
variable "project_name" {
  description = "Name of the project."
  type        = string
  default     = "hobbystacks"
}

variable "domain_name" {
  description = "Naked URL/domain for the droplets."
  type        = string
  default     = "hobbystacks.com"
}

variable "droplet_name" {
  description = "Name of the Droplet."
  type        = string
  default     = "main"
}

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

variable "vpc_name" {
  description = "Name of the VPC. Must be unique and contain alphanumeric characters, dashes, and periods only."
  type        = string
  default     = "hobbystacks-vpc"
}

variable "vpc_region" {
  description = "DigitalOcean region slug for the VPC's location."
  type        = string
  default     = "nyc1"
}

variable "vpc_ip_range" {
  description = "Range of IP addresses for the VPC in CIDR notation. Network ranges cannot overlap with other networks in the same account and must be in range of private addresses as defined in RFC1918. It may not be larger than /16 or smaller than /24."
  type        = string
  default     = null
}
