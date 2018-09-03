import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import timeago from "timeago.js";

import Photo from "./Photo";

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
		padding: 0.5em;
		border-radius: var(--curve-soft);
		margin: 5px;
		line-height: 3em;
	}

	h2,
	p {
		margin: 0;
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

const StyledEmptyMessage = styled.p`
	text-align: center;
	padding-top: 30vh;
	color: rgba(255, 255, 255, 0.3);
	width: 100%;
`;

const StyledDirectionIndicator = styled.span`
	font-weight: bold;
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
					<th>Updated</th>
				</tr>
			</thead>
			<tbody>
				{PRs.map(pr => (
					<tr key={pr.id}>
						<td>
							<h2>{pr.title}</h2>
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
						<td>{timeago().format(pr.updated)}</td>
					</tr>
				))}
			</tbody>
		</StyledTable>
		{PRs.length === 0 && (
			<StyledEmptyMessage>No pull requests awaiting review.</StyledEmptyMessage>
		)}
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
