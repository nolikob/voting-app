import { Badge, Loading, Stack, Tile, TileGroup, Text } from '@kiwicom/orbit-components';
import { Link } from 'react-router-dom';
import { useGetUserCreatedRooms } from '../firebaseActions';
import { Results } from './Results';
export const Dashboard = () => {
	const [data, loading] = useGetUserCreatedRooms();

	if (loading) {
		return <Loading />
	}

	console.log(data);

	return (
		<Stack flex direction="column">
			<Stack direction="row">
				<Link to="/admin/create">
					Create new room
				</Link>
			</Stack>
			<TileGroup>
				{data?.map((item, i) => <Tile
					key={`${item.roomName}-${i}`}
					expandable
					title={
						<Stack direction="row" justify="between" align="center">
							<Text>
								{item.roomName}
							</Text>
							<Badge type="info">
								{item.roomId}
							</Badge>
						</Stack>
					}
				>
					<Stack direction="column">
						<Stack justify="end" direction="row" align="center" spacing="small">
							<Text>
								Amount of votes:
							</Text>
							<Badge type="success">
								{item.voters.length}
							</Badge>
						</Stack>
						<Results results={item.votingOptions} />
					</Stack>
				</Tile>)}
			</TileGroup>
		</Stack>
	)
}