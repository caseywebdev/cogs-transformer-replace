module.exports = ({file: {buffer}, options, options: {patterns}}) => {
  let source = buffer.toString();
  for (let pattern in patterns) {
    let regexp;
    let replacement = patterns[pattern];
    let flags = options.flags || '';

    if (replacement instanceof Array) {
      flags = replacement[1];
      replacement = replacement[0];
    }

    try {
      regexp = new RegExp(pattern, flags);
    } catch (er) {
      throw new Error(`/${pattern}/${flags} ${er.message}`);
    }

    source = source.replace(regexp, replacement);
  }

  return {buffer: new Buffer(source)};
};
