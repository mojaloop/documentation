# Mojaloop Documentation

> This is the official documentation for the Mojaloop project.

__Published at: [docs.mojaloop.io](https://docs.mojaloop.io)__

## Building and testing locally

```bash

# install npm dependencies
npm ci 

# run the local server
npm run dev
```

## Building the project

Run `npm run build` to build the project to render the static vuepress site for a deployment.

## Rebuild all Puml -> svg

For consistent rending of sequence diagrams, we build the .puml sources to .svgs using the following script.

This script requires docker to be installed and running, since it uses a docker container to run the plantuml server.

```bash
# render all plantuml sources to svg files deterministically
./scripts/_build_plantuml.sh

# render just one file at a time, e.g. `figure1.plantuml`
PUML_MATCH="figure1.plantuml"  
./scripts/_build_plantuml.sh
```

This also ensures that the sequence diagrams are easily readable inline in markdown documents.

This script also runs as a git commit hook, so any changes added to puml sources are automatically
rendered to svg without you having to do anything!

If you want to skip the commit hook, you can always run `git commit -n`

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
