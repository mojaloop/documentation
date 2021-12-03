# Mojaloop Documentation

> This is the official documentation for the Mojaloop project.

__Published at: [docs.mojaloop.io](https://docs.mojaloop.io)__


## Building and testing locally

```bash

# install npm dependencies
yarn 

# run the local server
yarn run dev
```

## Building the project
Run `yarn run build` to build the project to render the static vuepress site for a deployment.

## Versioning

We use `vuepress-plugin-versioning` to help us keep older versions of our docs for posterity. By default, when you browse
the docs, you see the _latest published version_. Pending changes in the main/master branch are viewable under the versioning
tab in the top navigation bar.

See [https://titanium-docs-devkit.netlify.app/guide/versioning.html](https://titanium-docs-devkit.netlify.app/guide/versioning.html) for more information on the plugin.

We are working to automate this process, but for now, you can make a new version of the docs with the following:

```bash
./node_modules/.bin/vuepress version docs <version number>
```

> Known issue: sidebar not appearing in older versions
> Go to `./website/versioned_docs/<version number>/sidebar.config.json`
> And remove the `/next` at the start of each entry

### Deploying Manually

You can also deploy them manually, by running:
```bash
./scripts/_deploy_preview_s3.sh
``` 

Note that you need to have the `aws` cli, AWS access, and `aws-mfa` set up on your machine for this to work.

## Contributing to the project
Please refer to the [Contributing Guide](./contributing-guide.md) for details on how to contribute to Mojaloop Docs 2.0.

## License

Apache License. Version 2.0
See [`./license`](./LICENSE.md) for more information.
