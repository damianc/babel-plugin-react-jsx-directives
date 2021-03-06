const t = require('babel-types');
const u = require('../utils');
const Directive = require('./enum');

function transformHiddenDirective(path, state) {
	let showDirAttrs = path.node.openingElement.attributes;
	let showAttrIdx = u.getDirectiveIndex(showDirAttrs, Directive.HIDDEN);
	let showAttrValue = showDirAttrs[showAttrIdx].value;

	let displayObjProp = t.objectExpression([
		t.objectProperty(
			t.stringLiteral('visibility'),
			t.conditionalExpression(
				showAttrValue.expression,
				t.stringLiteral('hidden'),
				t.nullLiteral()
			)
		)
	]);

	let ownStyleObj;
	let ownStyleAttr = showDirAttrs.find(prop => prop.name && prop.name.name == 'style');
	if (ownStyleAttr) {
		ownStyleObj = ownStyleAttr.value.expression;
	} else {
		ownStyleObj = t.objectExpression([]);
	}

	let objectAssignCall = t.callExpression(
		t.memberExpression(
			t.identifier('Object'),
			t.identifier('assign')
		), [
			ownStyleObj,
			displayObjProp
		]
	);

	let newStyleProp = t.jSXAttribute(
		t.jSXIdentifier('style'),
		t.jSXExpressionContainer(
			objectAssignCall
		)
	);

	let styleIdx  = showDirAttrs.findIndex(attr => {
		return attr.name.name == 'style';
	});
	if (styleIdx !== -1) showDirAttrs.splice(styleIdx, 1);
	showDirAttrs.push(newStyleProp);

	path.replaceWith(
		u.createJSXElement(
			path.node.openingElement.name.name,
			showDirAttrs,
			path.node.children,
			[Directive.HIDDEN]
		)
	);
}

module.exports = transformHiddenDirective;