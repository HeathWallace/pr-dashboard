/* global process */
import React from "react";
import ReactDOM from "react-dom";
import bindMethods from "yaab";
import io from "socket.io-client";

import Header from "./components/Header";
import PullRequestList from "./components/PullRequestList";

const translate = data =>
	data
		.map(pr => {
			const item = {};
			item.project = pr.toRef.repository.project.key;
			item.repo = pr.toRef.repository.slug;
			item.updated = pr.updatedDate;
			item.author = {
				name: pr.author.user.displayName,
				username: pr.author.user.name,
				photo: pr.author.user.links.self[0].href + "/avatar.png",
			};

			item.title = pr.title;

			item.reviewers = pr.reviewers
				.slice()
				.sort((a, b) => a.user.name.localeCompare(b.user.name))
				.map(r => ({
					name: r.user.displayName,
					username: r.user.name,
					photo: r.user.links.self[0].href + "/avatar.png",
					approval: r.status,
				}));

			item.branches = {
				from: pr.fromRef.displayId,
				to: pr.toRef.displayId,
			};

			return item;
		})
		.sort((a, b) => b.updated - a.updated);

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { PRs: [], lastUpdated: 0, loading: false };
		bindMethods(this);
	}

	componentDidMount() {
		if (this.socket) return;
		this.socket = io();
		this.socket.on("loading", () => this.setState({ loading: true }));
		this.socket.on("prs", ({ PRs, lastUpdated }) =>
			this.setState({ PRs, lastUpdated, loading: false }),
		);
	}

	get lastUpdatedTime() {
		const { lastUpdated } = this.state;
		const d = new Date(lastUpdated);
		return `${d.getHours()}:${d.getMinutes()}`;
	}

	render() {
		const { PRs } = this.state;
		const { lastUpdatedTime } = this;
		return (
			<React.Fragment>
				<Header>
					<h1>Pull requests ({PRs.length})</h1>
					<span>Last updated: {lastUpdatedTime}</span>
				</Header>
				<PullRequestList PRs={translate(PRs)} />
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
