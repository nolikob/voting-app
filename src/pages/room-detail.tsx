import { Loading } from '@kiwicom/orbit-components';
import { useParams } from 'react-router-dom';
import { Layout } from '../layout/index';
import { useGetRoomData } from '../firebaseActions';
import { RoomDetailType } from '../types/RoomDetailTypes';
import { RoomDetail } from 'components/RoomDetail';

export const RoomDetailPage = () => {
	const params = useParams();
	const id = params?.id ?? "";
	const [data, loading] = useGetRoomData(id);

	if (loading) {
		return <Loading />
	}

	if (!loading && !data) {
		return <>
			Failed to load room data
		</>
	}

	const { amountOfVotesPerUser, roomName, votingOptions, voters } = data as RoomDetailType;

	return (
		<Layout>
			{loading ?
				<Loading />
				: <RoomDetail
					id={id}
					amountOfVotesPerUser={amountOfVotesPerUser}
					roomName={roomName}
					votingOptions={votingOptions}
					voters={voters}
				/>
			}
		</Layout>
	)
}