const { transformIfDirective } = require('./directives');
const { hasDirective } = require('./utils');

const DirectiveVisitor = {
	JSXElement(path, state) {

		switch(true) {
			case hasDirective(path, '$if'):
				transformIfDirective(path, state);
				break;
		}

	}
};

module.exports = () => ({
	name: 'react-directives',
	visitor: DirectiveVisitor
});