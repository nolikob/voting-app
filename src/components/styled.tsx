import { Grid } from "@kiwicom/orbit-components";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery"

export const PageGrid = styled(Grid)`
	padding-top: 65px;
	margin: 0 auto;
	width: 100%;
	min-height: 110vh;
	background: ${({ theme }) => theme.orbit.paletteWhite};
`;

export const MainWrapper = styled.main`
	padding-top: 9px;
	padding-bottom: 120px;

	${mq.desktop(css`
		max-width: 800px;
		width: 100%;
		margin: 0 auto;
		padding-left: ${({ theme }) => theme.orbit.spaceXLarge};
		padding-right: ${({ theme }) => theme.orbit.spaceXLarge};
		padding-bottom: 0;
	`)};

	@media (min-width: 1440px) {
		padding-right: 120px;
	}
`;

export const HeaderWrapper = styled.div`
	padding-top: 9px;
	padding-left: ${({ theme }) => theme.orbit.spaceMedium};
	padding-right: ${({ theme }) => theme.orbit.spaceMedium};

	${mq.desktop(css`
		padding-left: 0;
		padding-right: 0;
	`)};
`

export const Navbar = styled.nav`
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	height: 65px;
	background: #F5F7F9;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	padding-left: ${({ theme }) => theme.orbit.spaceXLarge};
	padding-right: ${({ theme }) => theme.orbit.spaceXLarge};
	flex: 1;
	box-sizing: border-box;
`;