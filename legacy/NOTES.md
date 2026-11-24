# Documentation Notes

Helpers and notes for building and working on these docs.


## Building `.svg`s from plantuml sources

We use a git commit hook to automatically rebuild `.svg` files from plantuml 
sources. The magic of git hooks means that no extra work is required by you
after creating or editing a `.puml` file

Behind the scenes, this hook spins up a docker container to run the PUML server
and calls `./scripts/_render_svg.mjs` for each file that has changed. We use the
docker version instead of the public puml server to (1) get around rate limits, and
(2) ensure deterministic SVG output that is git diffable.

### Creating a new PUML

1. Create a new `*.puml/plantuml` file
2. Add the file and generate the `.svg`

```bash
git add . #(or the specific file you are working on)
npm run build:plantuml:diff
```
3. Update your `.md` file to refer to the newly created `.svg` file
4. Git add/commit
### Updating an existing PUML

1. Make changes to an existing `*.puml/plantuml` file
2. `git add` + `git commit`
3. The pre-commit hook rebuilds the changed SVG files, and adds them before the commit

### Building all `.puml` sources manually

You can also force a complete rebuild of all `.puml` and `.plantuml` sources like so:

```bash
npm install
npm run build:plantuml:all
```

### `test-svg` CI/CD Step

This is a ci/cd step that ensures that the `.svg` files have been updated 
correctly,  just in case something got out of sync on your branch before 
merging a pull request.

It runs `npm run build:plantuml:all` to build all of the plantuml sources
and if it detects file changes, it means something went wrong with the
commit hook (or you skipped it with `git commit -n`).
