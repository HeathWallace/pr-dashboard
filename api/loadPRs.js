const fetch = require("node-fetch");

const flatten = arrs => arrs.reduce((a, b) => a.concat(b), []);

const depaginate = async (endpoint, opts) => {
	const results = [];
	let start = 0;
	let done = false;

	while (!done) {
		const response = await fetch(`${endpoint}?start=${start}`, opts);
		const { values, isLastPage, nextPageStart } = await response.json();
		done = isLastPage;
		start = nextPageStart;
		results.push(values);
	}

	return flatten(results);
};

module.exports = async servers =>
	Promise.all(
		servers.map(async ({ url, token }) => {
			const endpoint = `${url}/rest/api/latest/repos`;
			const headers = { Authorization: `Bearer ${token}` };

			return await depaginate(endpoint, { headers });
		}),
	);
