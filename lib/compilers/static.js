var fs = require('fs'),
    path = require('path'),
    current_directory = path.normalize(process.cwd()),
    config = require('./config');

exports.copy_files = function(root, files, cb){
  typeof files !== 'undefined' && files.forEach(function(file){

    var location = path.join(current_directory, root, file);
    var destination = path.join(current_directory, 'public', file);
    var contents = fs.readFileSync(location, 'utf8');
    fs.writeFileSync(destination, contents);
    config.debug('copied ' + path.basename(file));

  });
  cb();
}