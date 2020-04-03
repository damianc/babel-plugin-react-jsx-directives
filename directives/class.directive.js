const t = require('babel-types');
const u = require('../utils');
const Directive = require('./enum');

function transformClassDirective(path, state) {
	let classDirAttrs = path.node.openingElement.attributes;
	let classAttrIdx = u.getDirectiveIndex(classDirAttrs, Directive.CLASS);
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

	let classObjEntries = t.callExpression(
		t.memberExpression(
			t.identifier('Object'),
			t.identifier('entries')
		), [
			classExpression
		]
	);

	let classObjFilteredEntries = t.callExpression(
		t.memberExpression(
			classObjEntries,
			t.identifier('filter')
		), [
			t.arrowFunctionExpression(
				[t.identifier('c')],
				t.binaryExpression(
					'===',
					t.memberExpression(
						t.identifier('c'),
						t.identifier('1')
					),
					t.booleanLiteral(true)
				)
			)
		]
	);

	let classObjMappedEntries = t.callExpression(
		t.memberExpression(
			classObjFilteredEntries,
			t.identifier('map')
		), [
			t.arrowFunctionExpression(
				[t.identifier('c')],
				t.memberExpression(
					t.identifier('c'),
					t.identifier('0')
				)
			)
		]
	);

	let classNameConcatenatedArr = t.callExpression(
		t.memberExpression(
			classNameArr,
			t.identifier('concat')
		), [
			classObjMappedEntries
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
	// return console.log('>>>>>>>>>>>>>>>>>', classDirAttrs);

	path.replaceWith(
		u.createJSXElement(
			path.node.openingElement.name.name,
			classDirAttrs,
			path.node.children,
			[Directive.CLASS]
		)
	);
}

module.exports = transformClassDirective;