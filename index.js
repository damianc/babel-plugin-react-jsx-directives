const d = require('./directives');
const Directive = require('./directives/enum');
const { hasDirective } = require('./utils');

const DirectiveVisitor = {
	JSXElement(path, state) {

		if (hasDirective(path.node, Directive.IF)) {
			d.transformIfDirective(path, state);
			return;
		}

		if (hasDirective(path.node, Directive.FOR)) {
			d.transformForDirective(path, state);
			return;
		}

		if (hasDirective(path.node, Directive.SWITCH)) {
			d.transformSwitchDirective(path, state);
			return;
		}

	}
};

module.exports = () => ({
	name: 'react-jsx-directives',
	visitor: DirectiveVisitor
});