const d = require('./directives');
const Directive = require('./directives/enum');
const { hasDirective } = require('./utils');

const DirectiveVisitor = {
	JSXElement(path, state) {

		if (hasDirective(path, Directive.IF)) {
			d.transformIfDirective(path, state);
			return;
		}

		if (hasDirective(path, Directive.FOR)) {
			d.transformForDirective(path, state);
			return;
		}

		if (hasDirective(path, Directive.SWITCH)) {
			d.transformSwitchDirective(path, state);
			return;
		}

	}
};

module.exports = () => ({
	name: 'react-jsx-directives',
	visitor: DirectiveVisitor
});