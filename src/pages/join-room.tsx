import { Heading, InputField } from '@kiwicom/orbit-components';
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
				<InputField
					type="text"
					value={roomId} onChange={({ currentTarget: { value } }) => setRoomId(value)}
					spaceAfter="largest"
				/>
				<button type="submit">Join room</button>
			</form>
		</Layout>
	)
}