/* eslint-disable no-console */

const depaginate = require("./depaginate");

const flatten = arrs => [].concat.apply([], arrs);

const loadPRs = async ({ url, headers, project, repo }) => {
	const endpoint = `${url}/rest/api/latest/projects/${project}/repos/${repo}/pull-requests`;

	const PRs = await depaginate(endpoint, { headers });

	return PRs;
};

module.exports = async servers =>
	flatten(
		await Promise.all(
			servers.map(async ({ url, headers }) => {
				console.log(`Loading repos at ${url}...`);

				const endpoint = `${url}/rest/api/latest/repos`;

				const repos = (await depaginate(endpoint, { headers })).filter(
					r => r.project.type === "NORMAL",
				);

				if (!repos.length) return [];

				console.log(`Loading PRs from ${repos.length} repos on ${url}...`);

				const PRs = flatten(
					await Promise.all(
						repos.map(async r => {
							const repo = r.slug;
							const project = r.project.key;
							return flatten(await loadPRs({ url, headers, project, repo }));
						}),
					),
				);

				console.log(`${url} done, got ${PRs.length} PRs`);

				return PRs;
			}),
		),
	);
