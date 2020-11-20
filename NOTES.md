# Documentation Notes

Helpers and notes for building and working on these docs.

## Building `.svg`s from plantuml sources

We use a git commit hook to automatically rebuild `.svg` files from plantuml 
sources. The magic of git hooks means that no extra work is required by you
after creating or editing a `.puml` file

### Updating my changed diagram manually

During the editing process, you may want to rebuild the `.svg` files manually
to make sure they are rendering correctly.

```bash
git add . #(or the specific file you are working on)
npm run build:plantuml:diff
```

### Building all `.puml` sources manually

You can force a complete rebuild of all `.puml` and `.plantuml` sources like so:

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
