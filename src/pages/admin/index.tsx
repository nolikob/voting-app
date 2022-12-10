import { Heading, Stack } from '@kiwicom/orbit-components';
import { ChevronLeft } from '@kiwicom/orbit-components/lib/icons';
import { Link, Outlet, useMatch } from 'react-router-dom';
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
			{!isDashboard && <>
				<Link to="/admin">
					<ChevronLeft /> Back to dashboard
				</Link>
				<Outlet />
			</>}
		</Layout>
	)
}