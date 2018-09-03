import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const getColourFromApproval = ({ approval }) => {
	switch (approval) {
		case "APPROVED":
			return "#36B37E";
		case "NEEDS_WORK":
			return "#FFAB00";
	}
};

const getApprovalText = approval => {
	switch (approval) {
		case "APPROVED":
			return "✓";
		case "NEEDS_WORK":
			return "-";
	}
};

const StyledContainer = styled.div`
	display: inline-block;
	position: relative;
`;

const StyledApprovalIndicator = styled.span`
	border-radius: 50%;
	position: absolute;
	bottom: 0;
	right: 0;
	background: ${getColourFromApproval};
	width: 25px;
	height: 25px;
	text-align: center;
	margin: 0;
`;

const StyledPhoto = styled.img`
	border-radius: var(--curve-soft);
	margin-right: 5px;
	width: 50px;
`;

const Photo = ({ name, photo, approval }) => (
	<StyledContainer>
		<StyledPhoto src={photo} alt={name} approval={approval} />
		{approval && (
			<StyledApprovalIndicator approval={approval}>
				{getApprovalText(approval)}
			</StyledApprovalIndicator>
		)}
	</StyledContainer>
);

Photo.propTypes = {
	name: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	photo: PropTypes.string.isRequired,
	approval: PropTypes.oneOf(["APPROVED", "NEEDS_WORK", "UNAPPROVED"]),
};

export default Photo;
