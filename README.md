# Rewire Resolver Webpack Plugin

A webpack resolve plugin to allow changing the resolution of modules imported
from inside node_modules. Thus allowing progressive upgrades to a library
without having to replace every reference across the codebase.

For example if dependency A imported B, but you wanted it to actually use C
instead, this can be done with the rule:

`{source: 'A', target: 'B', rewire: 'C'}`

This plugin accepts an array of such rules and will apply them in order.

This is most useful when you have aliased a dependency but a package is still
trying to import it by its original name. Simply create a rule that targets the
original name and rewires it to its alias.


## Installation

Install the plugin with npm:

```shell
npm install --save-dev rewire-resolver-webpack-plugin
```


## Example Usage

Say your `package.json` contains the following dependencies:

```json

"dependencies": {
    "react": "^16",
    "react-15": "npm:react@15",
    "react-dom": "^16",
    "react-dom-15": "npm:react-dom@15",
}
```

Add the following toy your webpack.config.js:

```javascript

const RewireResolverPlugin = require('rewire-resolver-webpack-plugin')

...

resolve: {
    plugins: [new RewireResolverPlugin([
        {source: 'react-dom-16', target: 'react', rewire: 'react-16'},
    ])]
 }
```

This will rewire every `react` import from the `react-dom-16` package to
instead import from `react-16`
