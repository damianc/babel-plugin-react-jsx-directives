const t = require('babel-types');
const u = require('../utils');
const Directive = require('./enum');

function transformPartialStyleDirective(path, state) {
	let styleDirAttrs = path.node.openingElement.attributes;
	let styleAttrIdx = u.getPartialDirectiveIndex(styleDirAttrs, Directive.STYLE);
	let styleAttrName = styleDirAttrs[styleAttrIdx].name.name;
	let [, stylePropName] = styleAttrName.match(new RegExp(
		Directive.STYLE.replace('$', '\\$') + '-(.+)$'
	));
	let styleAttrValue = styleDirAttrs[styleAttrIdx];
	let styleNameAttr = styleDirAttrs.find(prop => {
		return prop.name.name == 'style';
	});
	let styleObj;
	let styleValue;
	let ownStyleValue;
	let eventualStylePropName = stylePropName;

	if (styleAttrValue && t.isJSXExpressionContainer(styleAttrValue.value)) {
		styleValue = styleAttrValue.value.expression;
	} else if (styleAttrValue && t.isStringLiteral(styleAttrValue.value)) {
		let _styleValue = styleAttrValue.value.value;
		if (/.+_(.+)$/.test(stylePropName)) {
			let [, unit] = stylePropName.match(/.+_(.+)$/);
			if (unit === 'percent') unit = '%';
			_styleValue += unit;

			let unitMarkIdx = stylePropName.indexOf('_');
			eventualStylePropName = stylePropName.slice(0, unitMarkIdx);
		}
		styleValue = t.stringLiteral(_styleValue);
	}

	if (/\-/.test(stylePropName)) {
		eventualStylePropName = eventualStylePropName.replace(/\-(\w)/g, (_, fl) => fl.toUpperCase());
	}

	styleValue = t.objectExpression([
		t.objectProperty(
			t.stringLiteral(eventualStylePropName),
			styleValue
		)
	]);

	if (styleNameAttr) {
		ownStyleValue = styleNameAttr.value.expression;
	} else {
		ownStyleValue = t.objectExpression([]);
	}

	let objectAssignCall = t.callExpression(
		t.memberExpression(
			t.identifier('Object'),
			t.identifier('assign')
		), [
			ownStyleValue,
			styleValue
		]
	);

	let newStyleProp = t.jSXAttribute(
		t.jSXIdentifier('style'),
		t.jSXExpressionContainer(
			objectAssignCall
		)
	);

	let styleIdx  = styleDirAttrs.findIndex(attr => {
		return attr.name.name == 'style';
	});
	if (styleIdx !== -1) styleDirAttrs.splice(styleIdx, 1);
	styleDirAttrs.push(newStyleProp);

	path.replaceWith(
		u.createJSXElement(
			path.node.openingElement.name.name,
			styleDirAttrs,
			path.node.children,
			[Directive.PARTIAL_STYLE(stylePropName)]
		)
	);
}

module.exports = transformPartialStyleDirective;