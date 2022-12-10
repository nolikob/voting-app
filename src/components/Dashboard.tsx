import { Badge, Loading, Stack, Tile, TileGroup, Text, Button } from '@kiwicom/orbit-components';
import { Edit, Remove } from '@kiwicom/orbit-components/lib/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUserCreatedRooms, removeRoom } from '../firebaseActions';
import { Results } from './Results';
export const Dashboard = () => {
	const [data, loading] = useGetUserCreatedRooms();
	const navigate = useNavigate();

	if (loading) {
		return <Loading />
	}

	return (
		<Stack flex direction="column">
			<Stack direction="row">
				<Link to="/admin/create">
					Create new room
				</Link>
			</Stack>
			<TileGroup>
				{data?.map((item) => <Tile
					key={`${item.roomId}`}
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
						<Stack justify="end">
							<Button size="small" type="secondary" onClick={() => navigate(`/admin/edit/${item.roomId}`)}>
								<Edit />
							</Button>
							<Button size="small" type="critical" onClick={async () => removeRoom(item.roomId)}>
								<Remove />
							</Button>
						</Stack>
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