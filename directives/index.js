const transformIfDirective = require('./if.directive');
const transformForDirective = require('./for.directive');
const transformSwitchDirective = require('./switch.directive');

module.exports = {
	transformIfDirective,
	transformForDirective,
	transformSwitchDirective
};