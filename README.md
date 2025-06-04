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

## PR Preview System

The documentation site includes an automated PR preview system that creates a live preview of documentation changes for each pull request. Here's how it works:

### Key Components

1. **CircleCI Configuration** (`.circleci/config.yml`):
   - `deploy_pr_preview` job: Handles PR preview deployment
   - `cleanup_pr_preview` job: Cleans up old PR previews
   - Enforces a limit on the number of concurrent previews

2. **Deployment Script** (`scripts/_deploy_preview_s3.sh`):
   - Builds the documentation site with PR preview environment variables
   - Uploads to S3 under the `/pr/{PR_NUMBER}/` path
   - Sets appropriate permissions and headers

3. **CloudFront Configuration** (`infra/src/cloudfront.tf`):
   - Serves PR previews from the S3 bucket
   - Handles directory indexes via CloudFront function
   - Manages caching and routing

4. **CloudFront Function** (`infra/src/redirect/index.js`):
   - Handles directory index requests (e.g., `/pr/123/` → `/pr/123/index.html`)
   - Manages legacy URL redirects

5. **Preview Banner** (`docs/.vuepress/theme/components/PreviewBanner.vue`):
   - Displays a prominent banner at the top of PR preview pages
   - Shows PR number and links to the GitHub PR
   - Automatically adjusts navbar height to accommodate the banner

### How to Use

1. Create a pull request against the main branch
2. CircleCI will automatically:
   - Build the documentation with PR preview mode enabled
   - Deploy to a preview URL: `https://docs.mojaloop.io/pr/{PR_NUMBER}`
   - Comment on the PR with the preview URL
3. Preview will be automatically cleaned up when the PR is closed

### Preview Limits

- Maximum of 10 concurrent previews
- Previews are automatically cleaned up after PR closure
- Existing previews are updated when new commits are pushed

### Testing Locally

To test the PR preview system locally:

```bash
# Run with PR preview mode enabled
VUEPRESS_IS_PR=true VUEPRESS_PR_NUMBER=123 npm run dev
```

This will:
- Show the PR preview banner
- Adjust the navbar height automatically
- Display the PR number and link to GitHub

### Troubleshooting

If a preview isn't working:
1. Check the CircleCI build logs for deployment issues
2. Verify the PR number is correctly extracted
3. Ensure the CloudFront function is properly handling directory indexes
4. Check S3 for the presence of files at `/pr/{PR_NUMBER}/`
5. Verify environment variables are set correctly in the build process

## Contributing to the project
Please refer to the [Contributing Guide](./contributing-guide.md) for details on how to contribute to Mojaloop Docs 2.0.

## License

Apache License. Version 2.0
See [`./license`](./LICENSE.md) for more information.
