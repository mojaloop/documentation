variable "website-domain-main" {
  description = "Main website domain, e.g. cloudmaniac.net"
  type        = string
}

variable "website-domain-redirect" {
  description = "Secondary FQDN that will redirect to the main URL, e.g. www.cloudmaniac.net"
  default     = null
  type        = string
}

variable "tags" {
  description = "Tags added to resources"
  default     = {}
  type        = map(string)
}

variable "region" {
  description = "AWS Region to deploy in"
  type = string
}

variable "cloudfront-certificate-arn" {
  description = "The arn of the manually configured certificate for the configured domain"
  type = string
}