# @outofaxis/fugo-ui-kit

<a href="https://www.chromatic.com/library?appId=62e175a10aef0868688d91fa"><img src="https://img.shields.io/badge/storybook-open-green"/></a>

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

### Prepare

```shell
npm i --legacy-peer-deps
```

### Testing in storybook

Update `YourComponent.stories.tsx` file and check it with `npm start`

### Testing in project

1. Use `yarn link` from the root of the project
2. Use `yarn link @outofaxis/fugo-ui-kit` to link the package in your project and test updated component
   - Check that there is no `node_modules` folder in this kit project folder. Otherwise, it will use local dependencies instead of resolving to ones from your project. That will cause errors.
3. Use `yarn unlink` to unlink the package after testing

### Publishing

1. Update version in `package.json`
2. Push to `master` branch. It should automatically release the new version to npm with GitHub action
3. Check that GitHub action done successfully
4. Run `yarn add @outofaxis/fugo-ui-kit` to update the package in your project
