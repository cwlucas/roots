exports.settings =
  file_type: 'coil'
  target: 'coil'

exports.compile = (file, callback) ->
  error = false

  try
    compiled_contents = file.contents
  catch err
    error = err

  file.write(compiled_contents) unless error
  callback(error, file)