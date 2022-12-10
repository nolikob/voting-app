import { useGetRoomData } from "firebaseActions";
import { useParams } from "react-router-dom"
import { Loading, Text } from "@kiwicom/orbit-components";
import { RoomDetailType } from '../../types/RoomDetailTypes';
import { EditRoomForm } from "components/EditRoomForm";

export const EditRoomPage = () => {
	const params = useParams();
	const id = params?.id ?? "";
	const [data, loading, error] = useGetRoomData(id);

	if (loading) {
		return <Loading />
	}

	if (!loading && !error) {
		return <EditRoomForm roomDetail={data as RoomDetailType} />
	}

	return <Text type="critical">
		Failed to load room data
	</Text>
}