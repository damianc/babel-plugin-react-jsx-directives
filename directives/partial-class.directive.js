const t = require('babel-types');
const u = require('../utils');
const Directive = require('./enum');

function transformPartialClassDirective(path, state) {
	let classDirAttrs = path.node.openingElement.attributes;
	let classAttrIdx = u.getPartialDirectiveIndex(classDirAttrs, Directive.CLASS);
	let classAttrName = classDirAttrs[classAttrIdx].name.name;
	let [, className] = classAttrName.match(new RegExp(Directive.CLASS + '-(.+)$'));
	let classExpression = classDirAttrs[classAttrIdx].value.expression;
	let classNameAttr = classDirAttrs.find(prop => {
		return prop.name.name == 'className';
	});
	let classNameValue;

	if (classNameAttr && t.isJSXExpressionContainer(classNameAttr.value)) {
		classNameValue = classNameAttr.value.expression;
	} else if (classNameAttr && t.isStringLiteral(classNameAttr.value)) {
		classNameValue = classNameAttr.value;
	}

	let classNameArr = classNameValue ? t.arrayExpression([
		classNameValue
	]) : t.arrayExpression([]);

	let classNameConcatenatedArr = t.callExpression(
		t.memberExpression(
			classNameArr,
			t.identifier('concat')
		), [
			t.arrayExpression([
				t.conditionalExpression(
					classExpression,
					t.stringLiteral(className),
					t.stringLiteral('')
				)
			])
		]
	);

	let classNameString = t.callExpression(
		t.memberExpression(
			classNameConcatenatedArr,
			t.identifier('join')
		), [
			t.stringLiteral(' ')
		]
	);

	let newClassNameProp = t.jSXAttribute(
		t.jSXIdentifier('className'),
		t.jSXExpressionContainer(
			classNameString
		)
	);

	let classNameIdx  = classDirAttrs.findIndex(attr => {
		return attr.name.name == 'className';
	});
	if (classNameIdx !== -1) classDirAttrs.splice(classNameIdx, 1);
	classDirAttrs.push(newClassNameProp);

	path.replaceWith(
		u.createJSXElement(
			path.node.openingElement.name.name,
			classDirAttrs,
			path.node.children,
			[Directive.PARTIAL_CLASS(className)]
		)
	);
}

module.exports = transformPartialClassDirective;