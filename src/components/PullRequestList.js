import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import timeago from "timeago.js";

import Photo from "./Photo";
import DayCount from "./DayCount";

const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;

	thead {
		background: var(--color-lighter);
		text-align: left;
	}

	th,
	td {
		padding: 1em;
		vertical-align: center;
	}

	tbody tr {
		border-bottom: 2px solid rgba(255, 255, 255, 0.05);
	}

	code {
		background: rgba(255, 255, 255, 0.05);
		padding: 0.66em;
		border-radius: var(--curve-soft);
		margin: 5px;
	}

	h2,
	p {
		margin: 0;
	}

	a {
		color: inherit;
		text-decoration: none;
	}
`;

const StyledProjectName = styled.p`
	opacity: 0.4;
`;

const StyledAuthorContainer = styled.div`
	display: flex;
	align-items: center;

	span {
		padding-left: 1em;
	}
`;

const StyledDirectionIndicator = styled.span`
	font-weight: bold;
`;

const getColourFromStatus = ({ status }) => {
	switch (status) {
		case "successful":
			return "#36B37E";
		case "failed":
			return "red";
		case "inProgress":
			return "#FFAB00";
	}
};

const getEmojiFromStatus = status => {
	switch (status) {
		case "successful":
			return "✔️";
		case "failed":
			return "❗";
		case "inProgress":
			return "⏳";
	}
};

const StyledBuildIndicator = styled.span`
	padding: 0.33em;
	border-radius: var(--curve-soft);
	background: ${getColourFromStatus};
`;

const PullRequestList = ({ PRs }) => (
	<React.Fragment>
		<StyledTable>
			<thead>
				<tr>
					<th>Title</th>
					<th>Author</th>
					<th>Reviewers</th>
					<th>Branches</th>
					<th>Build</th>
					<th>Updated</th>
				</tr>
			</thead>
			<tbody>
				{PRs.map(pr => (
					<tr key={pr.id}>
						<td>
							<a href={pr.href} target="_blank" rel="noopener noreferrer">
								<h2>{pr.title}</h2>
							</a>
							<StyledProjectName>
								{pr.project} {pr.repo}
							</StyledProjectName>
						</td>
						<td>
							<StyledAuthorContainer>
								<Photo {...pr.author} />
								<span>{pr.author.name}</span>
							</StyledAuthorContainer>
						</td>
						<td>
							{pr.reviewers.map(r => (
								<Photo key={r.name} {...r} />
							))}
						</td>
						<td>
							<code>{pr.branches.from}</code>
							<StyledDirectionIndicator>→</StyledDirectionIndicator>
							<code>{pr.branches.to}</code>
						</td>
						<td>
							{Object.entries(pr.builds)
								.map(([value, count]) => Array(count).fill(value))
								.reduce((a, b) => a.concat(b), [])
								.map((status, i) => (
									<StyledBuildIndicator key={i} status={status}>
										{getEmojiFromStatus(status)}
									</StyledBuildIndicator>
								))}
						</td>
						<td>{timeago().format(pr.updated)}</td>
					</tr>
				))}
			</tbody>
		</StyledTable>
		{PRs.length === 0 && <DayCount />}
	</React.Fragment>
);

PullRequestList.propTypes = {
	PRs: PropTypes.arrayOf(
		PropTypes.shape({
			project: PropTypes.string.isRequired,
			repo: PropTypes.string.isRequired,
			updated: PropTypes.number.isRequired,
			author: PropTypes.object.isRequired,
			reviewers: PropTypes.arrayOf(PropTypes.object).isRequired,
			branches: PropTypes.string.isRequired,
		}),
	).isRequired,
};

export default PullRequestList;
