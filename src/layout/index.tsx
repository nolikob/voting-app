import { Button, ToastRoot } from "@kiwicom/orbit-components";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { HeaderWrapper, MainWrapper, PageGrid, Navbar } from "../components/styled";
import styled from 'styled-components';
import { isUserLoggedIn, logout } from '../firebase';

const StyledLink = styled(Link)`
	text-decoration: none;
`

interface Props {
	readonly header?: ReactNode;
	readonly showLogin?: boolean;
	readonly children?: ReactNode;
}

export const Layout: FC<Props> = ({ header, children, showLogin = false }) => {
	const isUserLogged = isUserLoggedIn();

	return (
		<PageGrid columns="1fr" maxWidth="100%" desktop={{ columns: "1fr" }}>
			<Navbar>
				<StyledLink to="/" >
					Voti
				</StyledLink>
				{isUserLogged ? <Button type="white" onClick={() => logout()}>
					Logout
				</Button> : null}
				{showLogin && !isUserLogged ? <StyledLink to="admin">
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
			<ToastRoot placement="top-right" topOffset={70} />
		</PageGrid>
	)
}