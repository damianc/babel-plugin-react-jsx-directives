const DEFAULT_PREFIX = 'rx';
let _prefix = DEFAULT_PREFIX;

module.exports = {
	getPrefix() {
		return _prefix;
	},
	setPrefix(prfx) {
		_prefix = prfx;
	}
};

module.exports.defaultPrefix = DEFAULT_PREFIX;