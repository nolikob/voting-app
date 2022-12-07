import { Button, ToastRoot, Stack } from '@kiwicom/orbit-components';
import { FC, ReactNode } from "react";
import { Link, useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();

	return (
		<PageGrid columns="1fr" maxWidth="100%" desktop={{ columns: "1fr" }}>
			<Navbar>
				<StyledLink to="/" >
					Voti
				</StyledLink>
				<Stack direction="row" justify="end" grow={false} spacing="medium">
					{(isUserLogged) &&
						<Button type="bundleMedium" onClick={() => navigate("/admin")}>
							Administration
						</Button>
					}
					{isUserLogged ? <Button type="white" onClick={() => logout()}>
						Logout
					</Button> : null}
					{showLogin && !isUserLogged ? <StyledLink to="admin">
						<Button type="secondary">
							Login
						</Button>
					</StyledLink> : null}
				</Stack>
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