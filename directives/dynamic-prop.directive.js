// const t = require('babel-types');
// const u = require('../utils');
// const Directive = require('./enum');

// function transformDynamicPropDirective(path, state) {
// 	let dpDirAttrs = path.node.openingElement.attributes;
// 	let dpAttrIdx = u.getDirectiveIndex(dpDirAttrs, Directive.DYNAMIC_PROP);
// 	let paramsExpression = paramsDirAttrs[paramsAttrIdx].value.expression;
// 	let callbackParamsExpression;

// 	if (t.isSequenceExpression(paramsExpression)) {
// 		callbackParamsExpression = [...paramsExpression.expressions];
// 	} else if (t.isIdentifier(paramsExpression)) {
// 		callbackParamsExpression = [paramsExpression];
// 	}

// 	let arrowCallback = t.arrowFunctionExpression(
// 		callbackParamsExpression,
// 		t.blockStatement([
// 			t.returnStatement(
// 				u.createJSXElement(
// 					'div',
// 					[],
// 					path.node.children
// 				)
// 			)
// 		])
// 	);

// 	path.replaceWith(
// 		u.createJSXElement(
// 			path.node.openingElement.name.name,
// 			paramsDirAttrs,
// 			[t.jSXExpressionContainer(arrowCallback)],
// 			[Directive.PARAMS]
// 		)
// 	);
// }

// module.exports = transformDynamicPropDirective;