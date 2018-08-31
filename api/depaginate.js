const fetch = require("node-fetch");

module.exports = async (endpoint, opts) => {
	let results = [];
	let start = 0;
	let done = false;

	while (!done) {
		const response = await fetch(`${endpoint}?start=${start}`, opts);
		const { values, isLastPage, nextPageStart } = await response.json();
		done = isLastPage;
		start = nextPageStart;
		results = [...results, ...values];
	}

	return results;
};
