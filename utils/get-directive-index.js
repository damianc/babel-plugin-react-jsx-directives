function getDirectiveIndex(attrsArr, directive) {
	return attrsArr.findIndex(attr => attr.name && attr.name.name === directive);
}

function getPartialDirectiveIndex(attrsArr, directive) {
	return attrsArr.findIndex(attr => {
		let reDirectiveName = new RegExp('^' + directive + '.+$');
		return attr.name ? reDirectiveName.test(attr.name.name) : false;
	});
}

module.exports = {
	getDirectiveIndex,
	getPartialDirectiveIndex
};