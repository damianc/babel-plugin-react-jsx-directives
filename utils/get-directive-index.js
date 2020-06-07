function getDirectiveIndex(attrsArr, directive) {
	return attrsArr.findIndex(attr => attr.name.name === directive);
}

function getPartialDirectiveIndex(attrsArr, directive) {
	return attrsArr.findIndex(attr => {
		let reDirectiveName = new RegExp('^' + directive + '.+$');
		return reDirectiveName.test(attr.name.name);
	});
}

module.exports = {
	getDirectiveIndex,
	getPartialDirectiveIndex
};