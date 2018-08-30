/* global process */
import React from "react";
import ReactDOM from "react-dom";
import bindMethods from "yaab";

import API from "./API";

import Header from "./components/Header";
import PullRequestList from "./components/PullRequestList";

API.read(process.env);

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pullRequests: [] };
		bindMethods(this);
	}

	async componentDidMount() {
		//
		// const PRs = await Promise.all(servers.map(API.loadPullRequestsFrom));
		//
		// this.setState({
		// 	pullRequests: PRs.flat(),
		// });
	}

	render() {
		return (
			<React.Fragment>
				<Header>
					<h1>Pull requests</h1>
				</Header>
				<PullRequestList data={this.state.pullRequests} />
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
