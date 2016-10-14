/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author David Weber
  based on aurelia-template-lint-loader by David Weber
*/
const AureliaLinter = require('aurelia-template-lint').AureliaLinter;

function lint(input, webpack, callback) {
  //Get options passed to the compiler
  const config = webpack.options.aureliaTemplateLinter;

  var bailEnabled = (webpack.options.bail === true);

  let linter;
  linter = new AureliaLinter(config.configuration);

  linter.lint(input)
    .then((errors) => {

      var emitter = config.emitErrors ? webpack.emitError : webpack.emitWarning;

      errors.forEach(error => {

        var errorText = `${error.message} [ln: ${error.line} col: ${error.column}]`;
        emitter(errorText);

        if (config.failOnHint) {
          var messages = "";
          if (config.bailEnabled) {
            messages = "\n\n" + webpack.resourcePath + "\n" + errorText;
          }
          throw new Error("Compilation failed due to aurelia template error errors." + messages);
        }
      });

      if (callback) {
        callback(null, input);
      }
    });
}

var cleaned = false;

module.exports = function (input, map) {
  this.cacheable && this.cacheable();
  var callback = this.async();

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
