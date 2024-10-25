'use strict';

require('mocha/mocha.css');
const mocha = require('mocha/mocha.js');

mocha.setup({
  ui: 'bdd',
});

require('./index.test.js');
require('./lib/Parser.test.js');
require('./lib/StringScanner.test.js');
require('./lib/XmlCdata.test.js');
require('./lib/XmlComment.test.js');
require('./lib/XmlDeclaration.test.js');
require('./lib/XmlDocument.test.js');
require('./lib/XmlDocumentType.test.js');
require('./lib/XmlElement.test.js');
require('./lib/XmlNode.test.js');
require('./lib/XmlProcessingInstruction.test.js');
require('./lib/XmlText.test.js');
require('./conformance.test.js');

mocha.checkLeaks();
mocha.run();
