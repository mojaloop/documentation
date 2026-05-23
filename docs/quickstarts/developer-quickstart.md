# Developer Quickstart Guide

This guide will help you set up a local Mojaloop development environment. Follow these steps to get Mojaloop running on your machine for development and testing purposes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker and Docker Compose** (latest stable version)
- **Node.js** (v14.x or later)
- **Git** (latest version)
- **Kubernetes CLI (kubectl)** (latest stable version)
- **Helm** (v3.x)
- **Postman** (for API testing)

## Setting Up Your Environment

### Step 1: Clone the Mojaloop Repository

```bash
# Create a directory for Mojaloop
mkdir mojaloop && cd mojaloop

# Clone the main repository
git clone https://github.com/mojaloop/mojaloop.git

# Navigate to the cloned repository
cd mojaloop
```

### Step 2: Install the Mojaloop CLI

The Mojaloop CLI helps you manage your local development environment:

```bash
# Install the Mojaloop CLI globally
npm install -g @mojaloop/ml-cli

# Verify the installation
ml-cli --version
```

### Step 3: Start the Local Environment

Use Docker Compose to start a local development environment:

```bash
# Navigate to the docker-compose directory
cd docker-compose

# Start the environment
docker-compose up -d
```

This will start all the necessary services including:
- Central ledger
- Central settlement
- Account lookup service
- Quoting service
- Mock services for testing

### Step 4: Verify the Installation

To verify that your local environment is running correctly:

```bash
# Check all containers are running
docker ps

# Verify API access
curl http://localhost:3000/health
```

You should see a response indicating the services are healthy.

## Running Your First Test Transfer

### Step 1: Import Postman Collection

1. Open Postman
2. Import the Postman collection from `./postman/mojaloop-local-test.postman_collection.json`
3. Set up the environment variables using the provided `./postman/mojaloop-local.postman_environment.json`

### Step 2: Execute the Test Scenario

1. In Postman, open the "Mojaloop Local Test" collection
2. Run the "End-to-End Transfer" folder
3. The collection will execute a series of requests to:
   - Register participants
   - Set up endpoints
   - Perform party lookup
   - Create and fulfill quotes
   - Execute a transfer

### Step 3: Monitoring the Transfer

You can monitor the transfer in real-time using the logs:

```bash
# View logs for the central ledger
docker logs -f ml-service-central-ledger
```

## Next Steps

Now that you have a working Mojaloop environment, you can:

1. **Explore the APIs**: Use Swagger UI at http://localhost:3000/swagger to explore all available APIs
2. **Modify a component**: Try making a small change to one of the services and see it take effect
3. **Run the automated tests**: Execute `npm test` in any component directory
4. **Check out the architecture**: Review the architecture documentation at `/docs/technical/architecture`

## Troubleshooting

If you encounter issues:

1. **Services not starting**: Check Docker logs with `docker-compose logs`
2. **API errors**: Ensure all services are healthy with `curl http://localhost:3000/health`
3. **Database connection issues**: Verify database services are running with `docker ps | grep mysql`

## Getting Help

If you need assistance:

1. **Join the Slack community**: [Mojaloop Slack](https://mojaloop-slack.herokuapp.com/)
2. **Check GitHub Issues**: [Mojaloop GitHub Issues](https://github.com/mojaloop/project/issues)
3. **Weekly community calls**: Join the weekly developer calls (details on the Mojaloop website)

Happy developing with Mojaloop! 