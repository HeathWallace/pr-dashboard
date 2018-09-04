import styled from "styled-components";

export default styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 1em;
	text-align: right;
	background-color: var(--color-dark);
	color: rgba(255, 255, 255, 0.3);

	p {
		margin: 0;
	}

	a {
		color: inherit;
		text-decoration: none;
	}
`;
