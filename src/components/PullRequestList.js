import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTable = styled.div``;

const PullRequestList = ({ data }) => (
	<table>
		<tr>
			<th>Project</th>
			<th>Author</th>
			<th>Reviewers</th>
			<th>Content</th>
		</tr>
		{data.map(pr => (
			<tr key={pr.id}>
				<td>Project</td>
				<td>Author</td>
				<td>Reviewers</td>
				<td>Content</td>
			</tr>
		))}
	</table>
);

PullRequestList.propTypes = {
	data: PropTypes.array.isRequired,
};

export default StyledTable;
