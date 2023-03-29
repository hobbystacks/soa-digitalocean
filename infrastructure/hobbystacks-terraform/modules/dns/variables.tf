################################################################################
# [Required Variables]
################################################################################
variable "domain_name" {
  description = "Naked URL/domain for the droplets."
  type        = string
}

variable "droplet_web_main_ip_address" {
  description = "IP address for the main web droplet."
  type        = string
}

################################################################################
# [Optional Variables]
################################################################################
