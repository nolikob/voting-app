import { Heading } from '@kiwicom/orbit-components';
import { Outlet } from 'react-router-dom';
import { Layout } from '../../layout/index';
export const AdminPage = () => {
	return (
		<Layout
			header={<Heading type="title1">Dashboard</Heading>}
		>
			<Outlet />
		</Layout>
	)
}