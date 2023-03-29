# Deploy Infrastructure as Code with Terraform

## Requirements

1. DigitalOcean Account
   1. [API Token created in DigitalOcean](https://docs.digitalocean.com/reference/api/create-personal-access-token/)
   2. [SSH Key uploaded to DigitalOcean](https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/to-team/)

## Steps

1. Initialize Terraform in the 'tf' folder.
2. Plan the infrastructure deployment.
3. Apply the planned changes to the infrastructure.
4. (Optional) Destroy your deployed infrastructure.

## References

- <https://docs.digitalocean.com/tutorials/sample-terraform-deploy/>
  - <https://github.com/do-community/terraform-sample-digitalocean-architectures>
- Terraform Modules
  - <https://learn.hashicorp.com/tutorials/terraform/module-create>
  - <https://www.digitalocean.com/community/tutorials/how-to-structure-a-terraform-project>
  - <https://github.com/wiwa1978/blog-hugo-netlify-code/blob/main/Terraform/DigitalOcean-Terraform-MultipleServers-Modules-Improved-Alternative>
- Initial Setup for Droplets
  - <https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-22-04>
  - <https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04>
  - <https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04>
