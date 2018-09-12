/* eslint-disable no-console */

const depaginate = require("./depaginate");
const fetch = require("node-fetch");

const flatten = arrs => [].concat.apply([], arrs);

const loadPRs = async ({ url, headers, project, repo }) => {
	const endpoint = `${url}/rest/api/latest/projects/${project}/repos/${repo}/pull-requests`;

	const PRs = await depaginate(endpoint, { headers });

	return PRs;
};

const createBuildStatus = ({ url, headers }) => async PRs =>
	Promise.all(
		PRs.map(async PR => {
			console.log(`Loading build status for ${PR.id}`);
			const { latestCommit } = PR.fromRef;
			const endpoint = `${url}/rest/build-status/latest/commits/stats/${latestCommit}`;
			const buildStatus = await fetch(endpoint, { headers });
			const builds = await buildStatus.json();
			return { ...PR, builds };
		}),
	);

module.exports = async servers =>
	flatten(
		await Promise.all(
			servers.map(async ({ url, headers }) => {
				console.log(`Loading repos at ${url}...`);

				const endpoint = `${url}/rest/api/latest/repos`;
				const addBuildStatus = createBuildStatus({ url, headers });

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

				const withBuilds = await addBuildStatus(PRs);

				console.log(`${url} done, got ${PRs.length} PRs`);

				return withBuilds;
			}),
		),
	);
