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

- _Heart GreenIT_:
    
    This module relies on a third-party library ([GreenIT-Analysis-cli](https://github.com/cnumr/GreenIT-Analysis-cli#a4363a9bcf7630e4a5a4cd264a7da9ec6f34b571)) which is written in _CommonJS_.
    
    As this module formatting is not fully supported by Deno yet (2022-08-01) and still requires a huge setup (install Node.js, NPM, the library and some additional configurations with the Deno std/node library), the module will not be ported yet, unfortunately.

### Tests

- Not all tests have been migrated because their require external library, as
  the one provided by Deno is not enough
