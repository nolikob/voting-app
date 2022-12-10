import { Heading, InputField, Button, Stack } from '@kiwicom/orbit-components';
import { Layout } from '../layout/index';
import { useNavigate } from 'react-router-dom';
import { joinRoom } from '../firebaseActions';
import { useState } from 'react';
export const JoinRoom = () => {
	const navigate = useNavigate();
	const [roomId, setRoomId] = useState("");

	return (
		<Layout header={<Heading as='h1'>Join a room</Heading>}>
			<form onSubmit={async (e) => {
				e.preventDefault();
				await joinRoom(roomId, navigate);
			}}>
				<Stack spacing="medium" direction="row" align="stretch">
					<InputField
						type="text"
						value={roomId} onChange={({ currentTarget: { value } }) => setRoomId(value)}
						spaceAfter="medium"
						placeholder="Pass in the code you received to join the voting poll."

					/>
					<Button type="primarySubtle" size="normal">Join</Button>
				</Stack>
			</form>
		</Layout>
	)
}