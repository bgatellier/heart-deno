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

The detection of the installed modules of Heart in its Node.js version relies on
the package.json files of the main installation and of each module.

As these files do not exist in Deno, the choice has been made to rely on the
[import map mecanism](https://deno.land/manual@v1.30.3/basics/import_maps) of
Deno >= 1.30. Which means:

- Installed Heart modules MUST exist in the import map
- The import map location MUST be specified in the `imports` property of the
  `deno.jsonc` file.

### Incompatible modules

Every module that depends on third-party libraries written in _CommonJS_:

- _Heart GreenIT_

As of 2023-02-14, this module formatting still requires an impossible setup
because of a non-traditional import from a git url and a specific commit.

### Tests

- Not all tests have been migrated because their require external library, as
  the one provided by Deno is not enough
