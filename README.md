# aurelia template lint loader for webpack

## Usage

Apply the aurelia template lint loader as pre/postLoader in your webpack configuration:

``` javascript
module.exports = {
    module: {
        rules: [ { test: /\.html$/, enforce: 'pre', use: "aurelia-template-lint-loader" } ]
    },
    new webpack.LoaderOptionsPlugin({
        options: {
            aureliaTemplateLinter: {
                // you can pass an configuration class
                // config reference https://github.com/MeirionHughes/aurelia-template-lint#config
                configuration: options && options.config,

                // aurelia errors are displayed by default as warnings
                // set emitErrors to true to display them as errors
                emitErrors: true,

                // aurelia does not interrupt the compilation by default
                // if you want any file with aurelia errors to fail
                // set failOnHint to true
                failOnHint: true,

                // aurelia does not type check by default
                // if you want to do type checking set
                // typeChecking to true and provide
                // the right fileGlob
                // reference https://github.com/MeirionHughes/aurelia-template-lint#static-type-checking
                // these settings can also be passed with configuration above
                typeChecking: true,
                fileGlob: 'ClientApp'
            }
        }
    })
}
```
## More options and confuguration
Behind the sence, the loader is using the following linter https://github.com/MeirionHughes/aurelia-template-lint

## Installation

``` shell
npm install aurelia-template-lint-loader --save-dev
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

