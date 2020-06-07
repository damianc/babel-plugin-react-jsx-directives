const transformIfDirective = require('./if.directive');
const transformForDirective = require('./for.directive');
const transformSwitchDirective = require('./switch.directive');
const transformClassDirective = require('./class.directive');
const transformPartialClassDirective = require('./partial-class.directive');

module.exports = {
	transformIfDirective,
	transformForDirective,
	transformSwitchDirective,
	transformClassDirective,
	transformPartialClassDirective
};