# aurelia template lint loader for webpack

## Usage

Apply the aurelia template lint loader as pre/postLoader in your webpack configuration:

``` javascript
module.exports = {
    module: {
        preLoaders: [
            {
                test: /\.html$/,
                loader: "aurelia-template-lint-loader"
            }
        ]
    },
    // more options in the optional aureliaTemplateLinter object
    aureliaTemplateLinter: {
        // you can pass an configuration class
        // config reference https://github.com/MeirionHughes/aurelia-template-lint#config
	    configuration: options && options.config,

		// aurelia errors are displayed by default as warnings
		// set emitErrors to true to display them as errors
		emitErrors: false,

		// aurelia does not interrupt the compilation by default
		// if you want any file with aurelia errors to fail
		// set failOnHint to true
		failOnHint: true,
	}
}
```
## Installation

``` shell
npm install aurelia-template-lint-loader --save-dev
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)


