import { Heading } from '@kiwicom/orbit-components';
import { Layout } from '../layout/index';
import { signInWithGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	const navigate = useNavigate();

	return (
		<Layout header={<Heading as='h1'>Login</Heading>}>
			<button onClick={async () => {
				try {
					await signInWithGoogle();
					if (window.localStorage.getItem("user")) {
						navigate("/join");
					}
				} catch (error) {
					alert("Login with Google failed, please try again.")
				}
			}}>
				Login With Google
			</button>
		</Layout>
	)
}