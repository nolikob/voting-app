import { Stack, Tag, Tile, TileGroup } from '@kiwicom/orbit-components';
import { Link, useLoaderData } from 'react-router-dom';
import { RoomDetailType } from '../@types/RoomDetailTypes';
export const Dashboard = () => {
	const data = useLoaderData() as RoomDetailType[] | undefined;

	return (
		<Stack flex direction="column">
			<Stack direction="row">
				<Link to="/admin/create">
					Create new room
				</Link>
			</Stack>
			<TileGroup>
				{data?.map((item, i) => <Tile key={`${item.roomName}-${i}`} expandable title={
					item.roomName
				}>
					<Tag>
						Amount of votes: {item.voters.length}
					</Tag>
				</Tile>)}
			</TileGroup>
		</Stack>
	)
}