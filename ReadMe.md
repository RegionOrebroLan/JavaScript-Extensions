# JavaScript-Extensions

Library with JavaScript additions and extensions.

[![npm](https://img.shields.io/npm/v/@regionorebrolan/extensions.svg)](https://www.npmjs.com/package/@regionorebrolan/extensions)

- [Types](https://github.com/RegionOrebroLan/JavaScript-Extensions/blob/master/src/)
- [Samples](https://github.com/RegionOrebroLan/JavaScript-Extensions/blob/master/Samples/ASP.NET-Core/Scripts/Index.ts)

## Solution structure
Inspired by this article/gist:

- [Directory structure for JavaScript/Node Projects](https://gist.github.com/tracker1/59f2c13044315f88bee9/)

## Development

During development you may want to test-publish your package. You can do this by using the GitHub Package Registry. To be able to use the GitHub Package Registry you have to:

1. Add the following to package.json

		"publishConfig": {
			"registry": "https://npm.pkg.github.com/"
		}

2. [Create a personal access token for the command line](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line/)
3. Then login:

		$ npm login --registry=https://npm.pkg.github.com
		> Username: USERNAME
		> Password: TOKEN
		> Email: PUBLIC EMAIL ADDRESS

4. Then you can publish your package.

Read more: [Configuring NPM for use with GitHub Package Registry](https://help.github.com/en/github/managing-packages-with-github-package-registry/configuring-npm-for-use-with-github-package-registry/)

If you want to consume packages from the GitHub Package Registry you have to:

1. Add a *.npmrc*-file to the root of your application.
2. Enter the following content in it:

		@your-github-user-name:registry=https://npm.pkg.github.com/
		registry=https://registry.npmjs.org/

Read more: [npmrc - The npm config files](https://docs.npmjs.com/files/npmrc)

## Information

### TypeScript-bundling

- **TypeScript** with **Babel**: [TypeScript-Babel-Starter](https://github.com/microsoft/TypeScript-Babel-Starter/)
- Howto set up **TypeScript**-bundling with **Rollup** and **Babel**: [Rollup-TypeScript-Babel](https://github.com/a-tarasyuk/rollup-typescript-babel/)
- Howto set up **TypeScript**-bundling with **Webpack** and **Babel**: [Webpack-TypeScript-Babel](https://github.com/a-tarasyuk/webpack-typescript-babel/)

## Notes

- If you sort an array with undefined values the undefined values will always be last - https://stackoverflow.com/questions/4783242/javascript-array-sort-with-undefined-values/