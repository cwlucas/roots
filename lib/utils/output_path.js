var path = require('path'),
    _ = require('underscore'),
    adapters = require('../adapters');

// takes a path from a roots project and outputs the path
// that it will compile to.

module.exports = function(file, strip){

  var folder_config = global.options.folder_config;

  var transform1 = path.join(file.replace(process.cwd(),''));
  output_path = transform1.replace(new RegExp('^\/' + folder_config.views + '|' + folder_config.assets), 'public');
  var extension = path.extname(file).slice(1);

  if (adapters[extension]) {
    var target_extension = adapters[extension].settings.target;
    output_path = output_path.replace(new RegExp(extension + "$"), target_extension);
  }

  return path.join(process.cwd(), output_path);
};
