# mojaloop-docs-2.0

> This is the official documentation for the Mojaloop project.


## Building and testing locally

Our updated docs currently live in the `./vuepress` directory

```bash
cd ./vuepress

# install npm dependencies
yarn 

# run the local server
yarn run dev
```


## Building the project
Run `yarn run build` to build the project to render the static vuepress site for a deployment.

## Deploying the v2.0 Docs Preview

We deploy these docs automatically with CircleCI.

The deploy script does not currently take versioning into account, but will in the future.

### Deploying Manually

You can also deploy them manually, by running:
```bash
./scripts/_deploy_preview_s3.sh
``` 

Note that you need to have the `aws` cli, AWS access, and `aws-mfa` set up on your machine for this to work.

## License

Apache License. Version 2.0
See [`./license`](./LICENSE.md) for more information.