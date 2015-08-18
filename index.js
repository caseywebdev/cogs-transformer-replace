var DEFAULTS = {
  flags: 'gi',
  patterns: {}
};

module.exports = function (file, options, cb) {
  var source = file.buffer.toString();
  var patterns = options.patterns;

  for (var pattern in patterns) {
    var regexp;
    var replacement = patterns[pattern];
    var flags = options.flags || DEFAULTS.flags;

    if (replacement instanceof Array) {
      flags = replacement[1] || '';
      replacement = replacement[0];
    }

    try {
      regexp = new RegExp(pattern, flags);
    } catch (er) {
      return cb(new Error('/' + pattern + '/' + flags + ' ' + er.message));
    }

    source = source.replace(regexp, replacement);
  }

  cb(null, {buffer: new Buffer(source)});
};
