var helper = require('cogs-test-helper');

helper.run({
  'test/config.json': {
    'test/input.txt': helper.getFileBuffer('test/output.txt')
  },
  'test/error-config.json': {
    'test/error.txt': Error
  }
});
