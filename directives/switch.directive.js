const t = require('babel-types');
const u = require('../utils');
const Directive = require('./enum');

function transformSwitchDirective(path, state) {
	const arrowIIFE = t.arrowFunctionExpression(
		[],
		t.blockStatement([
			t.emptyStatement()
		])
	);
}

module.exports = transformSwitchDirective;