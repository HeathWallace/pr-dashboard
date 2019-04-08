import React from "react";
import styled from "styled-components";

const StyledParagraph = styled.p`
	text-align: center;
	padding-top: 30vh;
	color: rgba(255, 255, 255, 0.3);
	width: 100%;
`;

Date.prototype.addDays = function (days) {
	const date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

const getNumWorkDays = (startDate, endDate) => {
	let numWorkDays = 0;
	let currentDate = new Date(startDate);
	const mirumDaysOff = 6; // Strips out non-weekend days off.
	while (currentDate <= endDate) {
		// Skips Sunday and Saturday
		if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
			numWorkDays++;
		}
		currentDate = currentDate.addDays(1);
	}
	return numWorkDays - mirumDaysOff;
};

const DayCount = () => (
	<StyledParagraph>
		No pull requests awaiting review. #Day
		{getNumWorkDays(new Date(2018, 8, 7), new Date())}
	</StyledParagraph>
);

export default DayCount;
