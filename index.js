const t = require('babel-types');
const d = require('./directives');
const u = require('./utils');

const DirectiveVisitor = {
	JSXElement(path, state) {

		switch(true) {
			case u.hasDirective(path, '$if'):
				d.transformIfDirective(path, state);
				break;
		}
		
	}
};

module.exports = () => ({
	name: 'react-directives',
	visitor: DirectiveVisitor
});