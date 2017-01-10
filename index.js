/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author David Weber
  based on aurelia-template-lint-loader by David Weber
*/
const AureliaLinter = require('aurelia-template-lint').AureliaLinter;
const Config = require('aurelia-template-lint').Config;

function lint(input, webpack, callback) {

  //Get options passed to the compiler
  const config = webpack.options.aureliaTemplateLinter;

  //Type checking
  const shouldTypeCheck = config.typeChecking;

  if (config.configuration === undefined) {
    config.configuration = new Config();
  }

  //Setup linter
  let linter;

  //Configure linter
  if (shouldTypeCheck) {
    config.configuration.useRuleAureliaBindingAccess = true;
    config.configuration.reflectionOpts = {};
    config.configuration.reflectionOpts.sourceFileGlob = `${config.fileGlob}/**/*.ts`;
    linter = new AureliaLinter(config.configuration);
  } else {
    linter = new AureliaLinter(config.configuration);
  }

  //Lint current file
  linter.lint(input, webpack.resourcePath)
    .then((results) => {

      //Choose the right emitter
      const emitter = config.emitErrors ? webpack.emitError : webpack.emitWarning;

      let errorText = '';

      //Loop over results if any
      results.forEach(error => {
        //Setup error message
        errorText += `[${error.line}, ${error.column}]: ${error.message}\r\n`;
      });

      if (results && results.length > 0) {
        //Emit error message
        emitter(errorText);

        //Fail on hint
        if (config.failOnHint) {
          let messages = "\r\n" + webpack.resourcePath + "\r\n" + errorText;
          throw new Error("\r\n\r\nCompilation failed due to aurelia template error. Errors are:\r\n" + messages);
        }
      }

      //Call callack if asnc
      if (callback) {
        callback(null, input);
      }
    });
}

module.exports = function (input, map) {
  this.cacheable && this.cacheable();
  const callback = this.async();

  if (!callback) { // sync
    lint(input, this);
    return input;
  } else { // async
    try {
      lint(input, this, callback);
    } catch(e) {
      callback(e);
    }
  }
};
