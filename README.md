# Platforms Monorepo

This repository contains the applications and library code that make up the Axi platform front ends.

It is set up as a simple mono-repository that uses TypeScript references for any shared libraries.

## Global NPM Scripts

The global npm package has some helper scripts defined to help with working with the mono-repo:

- `npm run release -- release -p platforms-mobile` - This sets up the next release/hotfix for the specified app package
- `npm run install-all` – This runs `npm i` for all the packages in the repo, including the top level package. You can pass in additional arguments to this by adding `-- --save-dev package-you-want-to-install@1.0.1`
- `npm run tsc`/`npm run tsc -- platforms-mobile` - This runs `npx tsc -b` for all packages, or optionally just the package passed in in the arguments
- `npm run lint`/`npm run lint -- platforms-mobile` - This runs `npm run lint` for all packages, or optionally just the package passed in in the arguments
- `npm run test`/`npm run test -- platforms-mobile` - This runs `npm test` for all packages, or optionally just the package passed in in the arguments

## NPM Packages

You can install all the npm packages for all projects in the repo by running `npm run install-all` in the top directory.

The top level package.json includes some shared NPM packages (mainly around linting/building). These need to be kept the same between the various app and library packages. You will also need to run `npm i` in the top-level folder to install these packages for various commands to run successfully in the app/library packages.

`npm i` will also need to run in library folders used by app projects for the apps to run.

### Why Aren't We Using Package Hoisting?

Unfortunately React Native (specifically Metro) doesn't support it (Metro can't handle symlinks).

## Structure

The repository is organised in the following structure:

- apps/ – _Contains all user-facing front ends. As much as possible these should only contain UI code, with any business logic or infrastructure code being pulled in from the shared libraries_
- docs/ – _Contains any repository-wide documentation. Package specific documentation can often be fould in package/folder specific readme files_
- libs/ – _Contains shared library code that can be used by any of the front ends_
- tools/ – _Contains any bespoke tools or tooling that are used when working with the codebase_

## Libraries

Library packages are found in the `libs/` folder. We aim to move code out into libraries as much as possible, so it can easily be shared by different app packages.

The existing libraries include but are not limited to:

- `platforms-charting-adapter` – _Specifies the communication channel between applications and the chart application_
- `platforms-enums` – _Provides helpers for working with enums_
- `platforms-iterable` – _Provides helpers for working with iterable collections_
- `platforms-object` – _Provides helpers for working with objects_
- `platforms-result` – _Provides an implementation of the result pattern. Ideally, we should use this throughout the codebase where processing can return a result or known error cases_
- `platforms-tasks` – _Provides helpers for working with async code and long running tasks_
- `platforms-time` – _Provides helpers for working with time. Generally, code should be using Luxon for date and time concerns, but any additional time features we want should be included in this library_
- `platforms-trading-domain` – _Includes the models and logic for the trading domain_

### Adding a Library Package

New library packages are added as TypeScript projects. They are then referenced from the places they are used. Any shared NPM packages need to be manually kept synchronised in the repository (i.e. all the packages should use the same version of NPM package x).

New libraries should have Azure DevOps pipelines set up, and should be added as a branch policy against `main`. They should include a path filter, so builds only trigger if files have been changed within the library.

Set up the structure of the library package as needed, and then add it to the `"references"` config in the `tsconfig.json` file of the applications/packages that need to use it, e.g.

```
{
  "references": [
    …
    {
      "path": "../../libs/awesome-lib/src/index.ts",
    },
  ],
}
```

The easiest way to set up a new package is to copy one of the existing packages and to remove its source files and tests, remembering to rename the package and the build jobs.

See the official [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/project-references.html) for more details.
