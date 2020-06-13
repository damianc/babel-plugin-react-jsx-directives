const t = require('babel-types');
const u = require('../utils');
const Directive = require('./enum');

function transformModelDirective(path, state) {
	let modelDirAttrs = path.node.openingElement.attributes;
	let modelAttrIdx = u.getDirectiveIndex(modelDirAttrs, Directive.MODEL);
	let modelAttrValue = modelDirAttrs[modelAttrIdx].value.value;

	let isCheckbox = !!modelDirAttrs.find(
		attr => attr.name.name === 'type' && attr.value.value === 'checkbox'
	);

	let valueAttr = t.jSXAttribute(
		!isCheckbox ? t.jSXIdentifier('value') : t.jSXIdentifier('checked'),
		t.jSXExpressionContainer(
			t.memberExpression(
				t.memberExpression(
					t.identifier('this'),
					t.identifier('state')
				),
				t.identifier(modelAttrValue)
			)
		)
	);

	let onChangeHandler = t.arrowFunctionExpression(
		[t.identifier('e')],
		t.blockStatement([
			t.expressionStatement(
				t.callExpression(
					t.memberExpression(
						t.identifier('this'),
						t.identifier('setState')
					),
					[t.objectExpression([
						t.objectProperty(
							t.identifier(modelAttrValue),
							t.memberExpression(
								t.memberExpression(
									t.identifier('e'),
									t.identifier('target')
								),
								!isCheckbox ? t.identifier('value') : t.identifier('checked')
							)
						)
					])]
				)
			)
		])
	);

	let onChangeIIFE = t.callExpression(
		t.parenthesizedExpression(
		t.arrowFunctionExpression(
			[t.identifier('that')],
			t.blockStatement([
				t.returnStatement(
					t.callExpression(
						t.memberExpression(
							t.parenthesizedExpression(onChangeHandler),
							t.identifier('bind')
						),
						[t.identifier('that')]
					)
				)
			])
		)),
		[t.identifier('this')]
	);

	let onChangeAttr = t.jSXAttribute(
		t.jSXIdentifier('onChange'),
		t.jSXExpressionContainer(
			onChangeIIFE
		)
	);

	path.replaceWith(
		u.createJSXElement(
			path.node.openingElement.name.name,
			modelDirAttrs.concat([valueAttr, onChangeAttr]),
			path.node.children,
			[Directive.MODEL]
		)
	);
}

module.exports = transformModelDirective;