import { Button } from "@kiwicom/orbit-components";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { HeaderWrapper, MainWrapper, PageGrid, Navbar } from "../components/styled";
import styled from 'styled-components';

const StyledLink = styled(Link)`
	text-decoration: none;
`

interface Props {
	readonly header?: ReactNode;
	readonly showLogin?: boolean;
	readonly children?: ReactNode;
}

export const Layout: FC<Props> = ({ header, children, showLogin = false }) => {
	return (
		<PageGrid columns="1fr" maxWidth="100%" desktop={{ columns: "1fr" }}>
			<Navbar>
				<StyledLink to="/" >
					Voti
				</StyledLink>
				{showLogin ? <StyledLink to="admin">
					<Button type="secondary">
						Login
					</Button>
				</StyledLink> : null}
			</Navbar>
			<MainWrapper>
				<HeaderWrapper>
					{header}
				</HeaderWrapper>
				{children}
			</MainWrapper>
		</PageGrid>
	)
}