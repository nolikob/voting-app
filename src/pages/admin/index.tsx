import { Heading, Stack, Button } from '@kiwicom/orbit-components';
import { ChevronLeft } from '@kiwicom/orbit-components/lib/icons';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import { Dashboard } from '../../components/Dashboard';
import { Layout } from '../../layout/index';
export const AdminPage = () => {
	const isDashboard = useMatch("/admin");
	const navigate = useNavigate();

	return (
		<Layout
			header={
				<Stack justify="between" direction="row" spaceAfter="large">
					<Stack align="center" spacing="medium">
						{!isDashboard &&
							<Button size="small" type="white" onClick={() => navigate("/admin")}>
								<ChevronLeft />
							</Button>
						}
						<Heading type="title1">Dashboard</Heading>
					</Stack>
					{isDashboard && <Button size="small" onClick={() => navigate("/admin/create")}>
						Create new roow
					</Button>}
				</Stack>
			}
		>
			{isDashboard && <Dashboard />}
			{!isDashboard && <Outlet />}
		</Layout>
	)
}