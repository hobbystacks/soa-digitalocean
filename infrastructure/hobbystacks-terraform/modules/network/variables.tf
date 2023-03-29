################################################################################
# [Required Variables]
################################################################################
variable "vpc_name" {
  description = "Name of the VPC. Must be unique and contain alphanumeric characters, dashes, and periods only."
  type        = string
}

variable "vpc_region" {
  description = "DigitalOcean region slug for the VPC's location."
  type        = string
}

################################################################################
# [Optional Variables]
################################################################################
variable "vpc_ip_range" {
  description = "Range of IP addresses for the VPC in CIDR notation. Network ranges cannot overlap with other networks in the same account and must be in range of private addresses as defined in RFC1918. It may not be larger than /16 or smaller than /24."
  type        = string
  default     = null
}
