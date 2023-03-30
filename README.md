# Hobby Stacks - Service-Oriented Architecture (SOA) on DigitalOcean

[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/PhiltasticGuy/hobbystacks)

This project offers several examples of `single page applications (SPA)` communicating with APIs in a `service-oriented architecture (SOA)`. The resources are provisioned on DigitalOcean with `infrastructure as code (IaC)` using Terraform.

## Why create *Hobby Stacks*?

Our goal is to define a technology stack for hobby projects with **minimal costs**. We also want to offer real-world examples that go beyond basic tutorials that showcase technologies or features in overly simplified scenarios.

We decided to gear this tech stack towards **commercial projects** which meant opting for a private container registry and code repository.

| Features                         | Tools                                  | Alternatives       | Costs |
| -------------------------------- | -------------------------------------- | ------------------ | ----- |
| Hosting                          | [DigitalOcean](https://www.digitalocean.com/pricing/#Compute) | [Vultur](https://www.vultr.com/products/cloud-compute/#pricing) | **5$**    |
| Container Registry (**Private**) | [Azure Container Registry](https://azure.microsoft.com/en-ca/services/container-registry/) | [GitLab Container Registry](https://docs.gitlab.com/ee/user/project/container_registry.html)* | **5$** / Free |
| Repositories (**Private**)       | [Azure DevOps](https://azure.microsoft.com/en-ca/services/devops/git-repos/) | GitLab, GitHub      | *Free*  |
| CI/CD Pipelines                  | [Azure Pipelines](https://azure.microsoft.com/en-ca/services/devops/pipelines/) | GitLab, GitHub Actions, [Travis CI](https://travis-ci.com/plans/) | *Free*  |
| Web Server (Reverse Proxy)       | Nginx                                  | Traefik            | *Free*  |
| Web Performance & Security       | [Cloudflare](https://www.cloudflare.com/plans/#compare-features) | | *Free*  |
| SSL Certificates                 | [Let's Encrypt](https://letsencrypt.org/about/) + [Certbot](https://certbot.eff.org/about/) | | *Free*  |
| Multi-Container Tool             | Docker Compose                         |                    | *Free*  |
| IDE                              | [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/) | [Visual Studio Code](https://code.visualstudio.com/) | *Free*  |
| Front-end + UI                   |                                        |                    | *N/A*  |
| APIs                             |                                        |                    | *N/A*  |
| Database                         |                                        |                    | *N/A*  |

*\* GitLab Container Registry is only available for projects hosted on GitLab.*

## Getting Started

1. Prerequisites
    - [DigitalOcean](#digitalocean)
    - [JFrog](#jfrog)
2. Configuration Files
    - [Configure local development environment](#configure-local-development-environment)
3. Run Locally
    - [Launch All Services with Docker Compose](#launch-all-services-with-docker-compose)
4. Provisioning
    - [Provision Infrastructure with Terraform](#provision-infrastructure-with-terraform)

### Prerequisites

#### DigitalOcean

In order to provision the infrastructure on DigitalOcean you will need:

- **DigitalOcean Account**:
  - If you don't have one, [create your free DigitalOcean account](https://www.digitalocean.com/products/droplets/).
- **API Token created for your account**:
  - If you don't have one, [create an API Token for your DigitalOcean account](https://docs.digitalocean.com/reference/api/create-personal-access-token/).
- **SSH Key uploaded to your account**:
  - If you don't have one, [upload an SSH Key to your DigitalOcean account](https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/to-team/).

#### JFrog

In order to store Docker images and Terraform remote states you will need:

- **JFrog Account**:
  - If you don't have one, [create your free JFrog account](https://www.digitalocean.com/products/droplets/).
- **API Token created for your account**:
  - If you don't have one, [create an API Token for your JFrog account](https://docs.digitalocean.com/reference/api/create-personal-access-token/).

### Configuration Files

#### Configure local development environment

##### React

In order to run the `React` samples locally you will need:

- **.env**:
  - Location : `/src/web/hobbystacks-web-react-dotnet/ClientApp/.env`.
- **.env.development**:
  - Location : `/src/web/hobbystacks-web-react-dotnet/ClientApp/.env.development`.

##### ASP.NET Core Web API

In order to run the `API` samples locally you will need:

- **secrets.json**:
  - Location : `/src/api/hobbystacks-api-dotnet/secrets.json`.

##### ASP.NET Core Web API - 'db-init' Utility

In order to seed the `API` database locally you will need:

- **secrets.json**:
  - Location : `/src/api/hobbystacks-api-dotnet-db-init/secrets.json`.

##### Docker Compose - All Services

In order to run `docker-compose` locally you will need:

- **.env**:
  - Location : `/src/docker-compose/.env`.

### Run Locally

#### Run .NET Test Suites

In order to run the `API` integration tests locally you will need to create/configure the following files:

- **secrets.json**:
  - Location : `/src/api/hobbystacks-api-dotnet-integration-tests/secrets.json`.

```json
{
  "DB_DRIVER": "pgsql",
  "DB_HOST": "localhost",
  "DB_PORT": "5432",
  "DB_NAME": "hobbystacks",
  "DB_USER": "placeholder",
  "DB_PASSWORD": "SuperDuperPassword1"
}
```

#### Run React Test Suites

In order to run the `React` tests locally you will need to create/configure the following files:

- **.env.test**:
  - Location : `/src/web/hobbystacks-web-react-dotnet/ClientApp/.env.test`.

```bash
REACT_APP_API_WEATHER_BASEURL=https://valid.url.format
```

Once you have created the necessary configuration files, you can simply run the following commands from the project's root directory:

```bash
cd ./src/web/hobbystacks-web-react-dotnet/ClientApp
npm test
```

#### Launch All Services with Docker Compose

<!-- ### Azure DevOps

#### Prerequisites (Azure DevOps)

In order to use all of the tools in this stack you will need:

- **Azure DevOps Services Organization**:
  - If you don't have one, [create your free Azure DevOps Services account](https://aka.ms/SignupAzureDevOps).
- **Azure Account and Subscription**: You will need an active Azure account and subscription to provision the private Azure Container Registry.
  - If you don't have one, [create your free Azure account](https://azure.microsoft.com/en-us/free/);
  - If you have an active *Visual Studio subscription*, you are entitled to free Azure credit every month. You can refer to this [link](https://azure.microsoft.com/en-us/pricing/member-offers/msdn-benefits-details/) to read more about the offer and how to start using your monthly Azure credit.

#### Fork Project in Azure DevOps

More details.

#### Provision Azure Container Registry

For convenience, the steps to provision the Azure Container Registry have been scripted in PowerShell. The `provisionContainerRegistry.ps1` script can be found under `/src/infrastructure` in the [Azure DevOps repository](https://dev.azure.com/PhiltasticGuy/_git/aspnetcore-react-hobby-tech-stack).

In order to run the PowerShell script, you will need to [install the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest). You can refer to [Microsoft's quickstart guide](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli) to learn more about the commands used in the script.

```PowerShell
.\provisionContainerRegistry.ps1 -resourceGroupName "hobbystacks-rg" -resourceGroupLocation "EastUS" -containerRegistryName "hobbystacksRegistry" -containerRegistrySku "Basic"
```

#### Update Deployment Files

1. Docker Compose
    - Azure Container Registry
1. Nginx
    - server_name
    - ssl_certificate
    - ssl_Certificate_key

More details.

#### Configure Service Connections

1. Docker Registry
    - Azure Container Registry
1. SSH
    - DigitalOcean

More details.

#### Create Azure Pipelines

1. Build
    - YAML
1. Release
    - Enable CD.
    - Add Copy files over SSH step.
    - Add SSH step.

More details.

#### Configure variables in Azure Pipelines

1. Secret Variables
    - Azure Container Registry - Username
    - Azure Container Registry - Password
1. Variables
    - Certbot - Domains
    - Certbot - Main Domain
    - Certbot - Email
    - Certbot - Data Path

More details.

#### Setup Project in Azure DevOps (Azure DevOps Demo Template)

More details.

### Deployment

#### Create Build from Azure DevOps

More details.

#### View Results in Browser

More details. -->

### Provisioning

#### Provision Infrastructure with Terraform

More details.

## Authors

- **Philippe Turcotte** - *Initial work*

See also the list of [contributors](https://github.com/hobbystacks/baseline-digitalocean/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
