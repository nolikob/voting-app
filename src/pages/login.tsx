import { Heading, Button, Box, Stack } from '@kiwicom/orbit-components';
import { Layout } from '../layout/index';
import { signInWithGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Google } from '@kiwicom/orbit-components/lib/icons';

export const Login = () => {
	const navigate = useNavigate();

	return (
		<Layout header={<Heading as="h1">Please log in to continue</Heading>}>
			<Box padding="large">
				<Stack justify="center">
					<Button type="secondary" onClick={async () => {
						try {
							await signInWithGoogle();
							if (window.localStorage.getItem("user")) {
								navigate("/join");
							}
						} catch (error) {
							alert("Login with Google failed, please try again.")
						}
					}}>
						Login with&nbsp;<Google />
					</Button>
				</Stack>
			</Box>
		</Layout>
	)
}