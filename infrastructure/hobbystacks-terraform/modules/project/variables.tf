################################################################################
# [Required Variables]
################################################################################
variable "name" {
  description = "Name of the project."
  type        = string
}

variable "resource_urns" {
  description = "List of URNs for the resources associated with the project."
  type        = list(string)
}

################################################################################
# [Optional Variables]
################################################################################
