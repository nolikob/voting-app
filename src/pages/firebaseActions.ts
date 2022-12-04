import { firestore } from "../firebase"
import { doc, getDoc } from '@firebase/firestore';
import { RoomDetailType } from "../@types/RoomDetailTypes";

export const joinRoom = async (roomId: string, callback: (location: string) => void) => {
	try {
		const q = doc(firestore, "rooms", roomId);
		const room = await getDoc(q);
		if (room.exists()) {
			callback(`/room/${roomId}`);
		} else {
			throw new Error("Room does not exist");
		}
	} catch (error) {
		alert("Room with this ID does not exist");
	}
}

export const getRoomData = async (roomId: string)
	: Promise<RoomDetailType | undefined> => {
	try {
		const room = await getDoc(doc(firestore, "rooms", roomId));
		if (room.exists()) {
			return room.data() as RoomDetailType;
		}
		throw new Error("Room does not seem to exist anymore")
	} catch (error) {
		alert("Error while retrieving the room data")
	}
}