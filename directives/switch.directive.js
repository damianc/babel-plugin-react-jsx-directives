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

	let switchDirAttrs = path.node.openingElement.attributes;
	let switchAttrIdx = u.getDirectiveIndex(switchDirAttrs, Directive.SWITCH);
	let switchExamined = switchDirAttrs[switchAttrIdx].value;
	console.log('>>SWITCH>>', switchExamined);
}

module.exports = transformSwitchDirective;