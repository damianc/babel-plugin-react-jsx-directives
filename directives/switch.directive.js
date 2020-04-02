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

	if (t.isJSXExpressionContainer(switchExamined)) {
		let examinedExpr = switchExamined.expression;
		let _switch = t.switchStatement(examinedExpr, []);
		let _default;

		let switchChildrenElems = path.node.children.filter(ch => {
			return ch.type == 'JSXElement';
		});

		switchChildrenElems.forEach(ch => {
			if (u.hasDirective(ch, Directive.CASE)) {
				let caseDirAttrs = ch.openingElement.attributes;
				let caseAttrIdx = u.getDirectiveIndex(caseDirAttrs, Directive.CASE);
				let caseCondition = caseDirAttrs[caseAttrIdx].value;
				let _case = t.switchCase(caseCondition.expression, [
					t.returnStatement(
						u.createJSXElementFromNode(ch, [Directive.CASE])
					)
				]);
				_switch.cases.push(_case);
			} else if (u.hasDirective(ch, Directive.DEFAULT)) {
				let defaultDirAttrs = ch.openingElement.attributes;
				let defaultAttrIdx = u.getDirectiveIndex(defaultDirAttrs, Directive.DEFAULT);
				let defaultCondition = defaultDirAttrs[defaultAttrIdx].value;
				_default = t.returnStatement(ch);
			}
		});

		arrowIIFE.body.body.push(_switch, _default);

		path.replaceWith(t.callExpression(
			arrowIIFE,
			[]
		));



	}
}

module.exports = transformSwitchDirective;