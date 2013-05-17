var jade = require('jade');

exports.settings = {
  file_type: 'jade',
  target: 'html'
};

exports.compile = function(file, cb){
  var error;

  console.log(file)

  try {
    var page = jade.compile(file.contents, { pretty: !global.options.compress, filename: file.ref });
    var template = jade.compile(file.layout_contents, { pretty: !global.options.compress, filename: file.layout_path });
    var rendered_template = template(
      file.locals(
        { 'yield': page(file.locals()) }
      )
    );
    file.write(rendered_template);
  } catch(err) {
    error = err;
  }

  cb(error, file);
};
