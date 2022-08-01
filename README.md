# Heart, the Deno version

## Why a port to Deno?

This port of [Heart](https://heart.fabernovel.com/) to
[Deno](https://deno.land/) aims to be a sandbox for:

- Deno explorations (features, limitations)
- Codebase simplification, to reduce the learning curve
- Be the runtime to a future version of Heart? :)

## Usage

1. Create a .env file with secrets
2. Run the following command to list the available options

   ```shell
   deno task heart --help
   ```

## Differences with the Node.js version of Heart

### Modules detection

The detection of the installed modules of Heart in its Node.js version relies on the
package.json files of the main installation and of each module.

As these files do not exist in Deno, the choice has been made to rely on the
[import map mecanism](https://deno.land/manual/linking_to_external_code/import_maps).
Which means:

- Installed Heart modules MUST exist in the import map
- The import map location MUST be specified in the `importMap` property of the
  `deno.json` file.

### Incompatible modules

Every module that depends on third-party libraries written in _CommonJS_:
- _Heart GreenIT_
- _Heart Lighthouse_

As of 2022-08-01, this module formatting still requires a huge setup to works in Deno (install Node.js, NPM, the library and some additional configurations with the Deno `std/node` library), which goes against the codebase simplification objective.

### Tests

- Not all tests have been migrated because their require external library, as
  the one provided by Deno is not enough
