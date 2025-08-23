const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

if (typeof global.Request === 'undefined') {
  global.Request = function() {};
}

require('@testing-library/jest-dom');
