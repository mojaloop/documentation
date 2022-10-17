# Mojaloop Docs 2.0 Contributing Guide

> This README contains guide on contributing to Mojaloop Docs 2.0 - a Vuepress-powered site for Mojaloop documentation.


## Getting started
The first step in contributing to the Mojaloop documentation repository is to go through the Contributors guide and the 


## Setting up locally
Refer to the [README](./README#building-and-testing-locally) for guide on how to setup the documentation site locally.


## Adding Content
New content added to the documentation should follow the guidelines defined here in additi

## Creating new pages
TBD

## Migrating existing pages
While much of the migration is done manually for now, a script will soon be provided to allow you move content from an existing directory to the new documentation site. 


## Handling Images
TBDD


## Documentation Conventions
These are some of the defined conventions that guide contributing to the 

### Folder and Directory Structure
- All top-level documentation pages should be created as folders in the `vuepress/docs` directory. e.g. a `Community` top-level page is created in `vuepress/docs/community/`
- All 

## Assets 
- Assets including images for a specific pages should be added to the `/assets/` directory for that page/
- The naming convention for images (new or existing) added to the `/assets` documentation name should be `<page_name>-<figure>-<asset_name>

### Page/Section Headers
As much as is possible, the following should be adhered to when creating headers for pages and sections:

- Page headers should use sentence case.
- Page headers and section headers should not contain numbers. The previous Mojaloop documentation used numbers as part of page and section headers which resulted in brittle links that were easily broken when content was changed.


## Creating a Pull Request
Once you have created content that you are ready, the following steps should be followed to create a new PR:
- Run the `./verify-links` script to ensure that there are no broken links on your page. See [Verifying Page Links](#verifying-page-links) section for more details.
- Check for any typographical errors
- Create a pull request using `master` as the base branch



## Verifying Page Links
Before opening a PR, ensure that all the links on the new page are correct and accessible. While this process is manual for now, a `./verify-links` script will soon be added to the repository that can be run to verify all the links of the page.


## Versioning

TBD


