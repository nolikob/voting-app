import { Heading, Stack } from '@kiwicom/orbit-components';
import { Outlet, useMatch } from 'react-router-dom';
import { Dashboard } from '../../components/Dashboard';
import { Layout } from '../../layout/index';
export const AdminPage = () => {
	const isDashboard = useMatch("/admin")

	return (
		<Layout
			header={
				<Stack>
					<Heading type="title1">Dashboard</Heading>
				</Stack>
			}
		>
			{isDashboard && <Dashboard />}
			{!isDashboard && <Outlet />}
		</Layout>
	)
}