const t = require('babel-types');
const u = require('../utils');
const Directive = require('./enum');

function transformDynamicEventDirective(path, state) {
	let deDirAttrs = path.node.openingElement.attributes;
	let deAttrIdx = u.getDirectiveIndex(deDirAttrs, Directive.DYNAMIC_EVENT);
	let deArrayExpression = deDirAttrs[deAttrIdx].value.expression;

	if (!t.isArrayExpression(deArrayExpression)) return;

	let [eventName, eventHandler] = deArrayExpression.elements;
	let propObj = t.objectExpression([
		t.objectProperty(eventName, eventHandler, true)
	]);
	let spreadProp = t.jSXSpreadAttribute(propObj);

	path.replaceWith(
		u.createJSXElement(
			path.node.openingElement.name.name,
			deDirAttrs.concat([spreadProp]),
			path.node.children,
			[Directive.DYNAMIC_EVENT]
		)
	);
}

module.exports = transformDynamicEventDirective;