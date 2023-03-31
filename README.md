# Hobby Stacks - Service-Oriented Architecture (SOA) on DigitalOcean

[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/PhiltasticGuy/hobbystacks)

This project offers several examples of `single page applications (SPA)` communicating with APIs in a `service-oriented architecture (SOA)`. The resources are provisioned on DigitalOcean with `infrastructure as code (IaC)` using Terraform.

## Why create *Hobby Stacks*?

Our goal is to define a technology stack for hobby projects with **minimal costs**. We also want to offer real-world examples that go beyond basic tutorials that showcase technologies or features in overly simplified scenarios.

We decided to gear this tech stack towards **commercial projects** which meant opting for a private container registry and code repository.

| Features                         | Tools                                  | Costs |
| -------------------------------- | -------------------------------------- | ----- |
| Hosting                          | [DigitalOcean](https://www.digitalocean.com/pricing/#Compute) | **4$**    |
| Container Registry (**Private**) | [JFrog](#) | Free |
| Repositories (**Private**)       | [Azure DevOps](https://azure.microsoft.com/en-ca/services/devops/git-repos/), GitHub, GitLab | *Free*  |
| CI/CD Pipelines                  | [Azure Pipelines](https://azure.microsoft.com/en-ca/services/devops/pipelines/), GitHub Actions, GitLab CI/CD | *Free*  |
| Reverse Proxy       | Nginx, Traefik                                  | *Free*  |
| Web Performance & Security       | [Cloudflare](https://www.cloudflare.com/plans/#compare-features) | *Free*  |
| SSL Certificates                 | [Let's Encrypt](https://letsencrypt.org/about/) + [Certbot](https://certbot.eff.org/about/) or [acme.sh](https://github.com/acmesh-official/acme.sh) | *Free*  |
| Multi-Container Tool             | Docker Compose                         | *Free*  |
| IDE                              | [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/), [Visual Studio Code](https://code.visualstudio.com/) | *Free*  |
| Front-end + UI                   |                                        | *N/A*  |
| APIs                             |                                        | *N/A*  |
| Database                         |                                        | *N/A*  |

*\* GitLab Container Registry is only available for projects hosted on GitLab.*

## Table of Contents

- [Hobby Stacks - Service-Oriented Architecture (SOA) on DigitalOcean](#hobby-stacks---service-oriented-architecture-soa-on-digitalocean)
  - [Why create *Hobby Stacks*?](#why-create-hobby-stacks)
  - [Table of Contents](#table-of-contents)
  - [Sample : Weather Forecasts](#sample--weather-forecasts)
    - [Technologies](#technologies)
    - [Architecture](#architecture)
    - [CI/CD Pipeline](#cicd-pipeline)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
      - [Software](#software)
      - [DigitalOcean](#digitalocean)
      - [JFrog](#jfrog)
    - [Run Locally](#run-locally)
      - [Run .NET Test Suites](#run-net-test-suites)
      - [Run React Test Suites](#run-react-test-suites)
      - [Launch All Services with Docker Compose](#launch-all-services-with-docker-compose)
    - [Provisioning](#provisioning)
      - [Provision Infrastructure with Terraform](#provision-infrastructure-with-terraform)
  - [Authors](#authors)
  - [License](#license)

## Sample : Weather Forecasts

This sample build upon the usual weather forecast SPA and API from the `ASP.NET Core` project templates.

### Technologies

- Containers
  - Docker
  - Docker Compose
- Web
  - Hosting
    - DigitalOcean
  - Reverse Proxies
    - [nginx-proxy/nginx-proxy](https://github.com/nginx-proxy/nginx-proxy)
  - SSL Certificates
    - [nginx-proxy/acme-companion](https://github.com/nginx-proxy/acme-companion)
- Infrastructure as Code (IaC)
  - Terraform with Remote Backend/State
- Frontends
  - React
    - TypeScript
- Backends (APIs)
  - .NET 7
    - ASP.NET Core - Web API
    - C#
- Databases
  - PostgreSQL
- Repositories
  - Code Repositories
    - Azure DevOps
    - GitHub
  - Docker Registry
    - JFrog
  - Terraform Remote Backend
    - JFrog

### Architecture

N/A

### CI/CD Pipeline

N/A

## Getting Started

### Prerequisites

#### Software

1. Docker Engine
2. Docker Compose
3. .NET SDK
4. `dotnet-ef` Tool
5. Terraform
6. Visual Studio Community
7. Visual Studio Code

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

### Run Locally

#### Run .NET Test Suites

In order to run the `API` integration tests locally you will need to create/configure the following files:

- **secrets.json**:
  - Location : `src/api/hobbystacks-api-dotnet-integration-tests/secrets.json`.

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

- **.env**:
  - Location : `src/docker-compose/.env`.

```bash
DB_DRIVER=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hobbystacks
DB_USER=placeholder
DB_PASSWORD=SuperDuperPassword1
```

Once you have created the necessary configuration files, you can simply run the following commands from the project's root directory:

```bash
cd src/docker-compose

docker compose -f docker-compose.yml -f docker-compose.override.yml up -d db &&
dotnet test ../HobbyStacks.sln &&
docker compose -f docker-compose.yml -f docker-compose.override.yml down
```

Alternatively, you can open the `Test Explorer` window in `Visual Studio` to run the test suites after launching the `Database Services`.

#### Run React Test Suites

In order to run the `React` tests locally you will need to create/configure the following files:

- **.env.test**:
  - Location : `src/web/hobbystacks-web-react-dotnet/ClientApp/.env.test`.

```bash
REACT_APP_API_WEATHER_BASEURL=https://valid.url.format
```

Once you have created the necessary configuration files, you can simply run the following commands from the project's root directory:

```bash
cd src/web/hobbystacks-web-react-dotnet/ClientApp

npm test
```

#### Launch All Services with Docker Compose

In order to run the `Docker Compose` services you will need to create/configure the following files:

- **.env**:
  - Location : `src/docker-compose/.env`.

```bash
DB_DRIVER=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hobbystacks
DB_USER=placeholder
DB_PASSWORD=SuperDuperPassword1
```

Once you have created the necessary configuration files, you can simply run the following commands from the project's root directory:

```bash
cd src/docker-compose

# Start the services
docker compose -f docker-compose.yml -f docker-compose.override.yml up -d

# Stop the services
docker compose -f docker-compose.yml -f docker-compose.override.yml down
```

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
