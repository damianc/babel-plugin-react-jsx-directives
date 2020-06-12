const t = require('babel-types');
const u = require('../utils');
const Directive = require('./enum');

function transformDynamicPropDirective(path, state) {
	let dpDirAttrs = path.node.openingElement.attributes;
	let dpAttrIdx = u.getDirectiveIndex(dpDirAttrs, Directive.DYNAMIC_PROP);
	let dpArrayExpression = dpDirAttrs[dpAttrIdx].value.expression;

	if (!t.isArrayExpression(dpArrayExpression)) return;

	let [propName, propValue] = dpArrayExpression.elements;
	let propObj = t.objectExpression([
		t.objectProperty(propName, propValue, true)
	]);
	let spreadProp = t.jSXSpreadAttribute(propObj);

	path.replaceWith(
		u.createJSXElement(
			path.node.openingElement.name.name,
			dpDirAttrs.concat([spreadProp]),
			path.node.children,
			[Directive.DYNAMIC_PROP]
		)
	);
}

module.exports = transformDynamicPropDirective;