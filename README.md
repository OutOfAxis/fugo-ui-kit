# @outofaxis/fugo-ui-kit

<a href="https://fugo.ai"><img src="https://img.shields.io/badge/storybook-open-green"/></a>

React UI kit in Fugo style.

## How to use:

### Install

```shell
npm i -S @outofaxis/fugo-ui-kit
```

### TailwindCSS config

Add to `content` item for `tailwind`

`tailwind.config.js`:

```js
module.exports = {
  content: ["./node_modules/@outofaxis/fugo-ui-kit/lib/**/*.js"],
};
```

### Build config

Create React App should support Fugo UI Kit by default.

Build should be able to handle `*.module.css`, `*.css`, `*.svg` imports.

## Development

1. Change component
2. Update `component.stories.tsx` file and check it with `npm start`
3. Use `yarn link` from the root of the project
4. Use `yarn link @outofaxis/fugo-ui-kit` to link the package in your project and test updated component
   - Check that there is no `node_modules` folder in the kit project folder. Otherwise, it will use local dependencies instead of resolving to ones from your project. That will cause errors.
5. Use `yarn unlink` to unlink the package after testing
6. Update version in `package.json`
7. Push to `main` branch. It should automatically release the new version to npm
