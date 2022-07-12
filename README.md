# Differences with the Node.js version of Heart

## Heart module detection

The detection of the installed modules of Heart in its Node.js version relied on
package.json files.

As they do not exist inb Deno, the choice has been made to rely on the import
map mecanism of Deno. Which means:

- Installed Heart modules MUST exist in the import map
- The import map location is specified in the `importMap` property of the
  `deno.json` file.

## Tests

- Not all tests have been migrated because their require external library, as
  the one provided by Deno is not enough
