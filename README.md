# @outofaxis/fugo-ui-kit

<a href="https://www.chromatic.com/library?appId=62e175a10aef0868688d91fa"><img src="https://img.shields.io/badge/storybook-open-green"/></a>

React UI kit in Fugo style.

## How to use:

### Install

The kit depends on a lot of external dependencies that should be provided by your project.
Unfortunately, it can not be provided directly with kit dependencies because,
that way, these same packages used by your project will be bundled twice.

Because the kit uses "passive compilation", your project will bundle only necessary packages.

#### With Yarn

```shell
yarn add @date-io/date-fns@1 @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @material-ui/core @material-ui/pickers @outofaxis/react-google-flight-datepicker @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-portal @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-tooltip @reach/checkbox @reach/combobox @reach/dialog @reach/disclosure @reach/popover @reach/rect @reach/slider @reach/tabs animate.css date-fns final-form i18next lodash react react-device-detect react-dom react-final-form react-i18next react-router-dom rifm tailwindcss use-debounce use-media uuid react-keyed-flatten-children
```

```shell
yarn add @outofaxis/fugo-ui-kit
```

#### With NPM

```shell
npm i --legacy-peer-deps -S @date-io/date-fns@1 @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @material-ui/core @material-ui/pickers @outofaxis/react-google-flight-datepicker @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-portal @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-tooltip @reach/checkbox @reach/combobox @reach/dialog @reach/disclosure @reach/popover @reach/rect @reach/slider @reach/tabs animate.css date-fns final-form i18next lodash react react-device-detect react-dom react-final-form react-i18next react-router-dom rifm tailwindcss use-debounce use-media uuid react-keyed-flatten-children
```

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

### Testing in your project

Install `yalc` to your system:

```shell
npm i yalc -g
```

Yalc helps with properly linking local packages.

Add these lines to your global gitignore:

```gitignore
.yalc
yalc.lock
```

1. Run `yalc publish` from the root of that project
2. Use `yalc link @outofaxis/fugo-ui-kit` to link the package in your project and test updated component
3. Use `yalc remove --all` to unlink the package after testing
4. Run `yarn --check-files` to reinstall missing packages

Use `npm start` from this project to watch for changes
and automatically update the build in linked repositories.
You may need to rerun building of your project, because building tools may ignore external modules in watch mode.
To simplify that, config the watch mode to track files in `node_modules/@outofaxis/fugo-ui-kit`.

### Publishing

1. Run `npm version patch`. It should automatically update the version of the package, push it to the current branch, and if it's the main branch, it will publish it to npm.
2. Check that GitHub action was done successfully
3. Run `yarn add @outofaxis/fugo-ui-kit` to update the package in your project
