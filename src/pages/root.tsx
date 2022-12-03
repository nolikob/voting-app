import { Button, Heading, Stack, Text } from "@kiwicom/orbit-components";
import { useNavigate } from "react-router-dom";
import { Layout } from "../layout";

export const Root = () => {
	const navigate = useNavigate();

	return (
		<Layout showLogin header={
			<>
				<Heading as="h1" align="center" spaceAfter="medium">Welcome to VOTI</Heading>
				<Heading as="h2" align="center" spaceAfter="largest">Free to use platform to create voting polls</Heading>
			</>
		}>
			<Stack justify="center" direction="column" align="center">
				<Heading align="center" as="h2" spaceAfter="large">
					Wanna join an existing room and participate?<br />Click the join room button
				</Heading>
				<Button type="primary" onClick={() => navigate("/login")} spaceAfter="medium">
					Join room
				</Button>
				<Text align="center">
					or do you want to create room of your own?<br />Just click the create room button
				</Text>
				<Button type="primarySubtle" onClick={() => navigate("/admin")}>
					Create room
				</Button>
			</Stack>
		</Layout>
	)
}