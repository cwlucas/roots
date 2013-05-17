var Snockets = require('snockets');

exports.settings = {
  file_type: 'coffee',
  target: 'js'
};

exports.compile = function(file, cb){
  var error;

  // custom compiler for bare coffeescript
  var snockets = new Snockets();
  if (global.options.coffeescript_bare) {
    Snockets.compilers.coffee.compileSync = function(sourcePath, source) {
      return require('coffee-script').compile(source, { filename: sourcePath, bare: true });
    };
  }

  try {
    var compiled_js = snockets.getConcatenation(file.path, { async: false });
    file.write(compiled_js);
  } catch (err) {
    error = err;
  }
    
  cb(error);
};
