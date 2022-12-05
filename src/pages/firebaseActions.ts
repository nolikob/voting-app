import { firestore } from "../firebase"
import { doc, getDoc, setDoc, collection, addDoc, query, where, getDocs } from '@firebase/firestore';
import { RoomDetailType } from '../@types/RoomDetailTypes';
import { User } from "firebase/auth";

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

interface CreateRoomProps {
	readonly amountOfVotesPerUser: number,
	readonly votingOptions: string;
	readonly roomName: string;
}

export const createRoom = async ({ amountOfVotesPerUser, roomName, votingOptions }: CreateRoomProps) => {
	const user = getUser()

	if (user) {
		const newRoom: RoomDetailType = {
			amountOfVotesPerUser,
			roomName,
			votingOptions: votingOptions.split(",").map(option => option.trim()),
			authorId: user.uid,
			voters: []
		}

		return await addDoc(collection(firestore, "rooms"), {
			...newRoom
		});
	}
};

export const updateRoom = async (roomId: string, data: RoomDetailType) => {
	return await setDoc(doc(firestore, "rooms", roomId), {
		...data
	})
}

export const getUserCreatedRooms = async () => {
	const user = getUser();
	try {
		if (user) {
			const q = query(collection(firestore, "rooms"), where("authorId", "==", user.uid));
			const rooms = await getDocs(q);
			if (!rooms.empty) {
				return rooms.docs.map(room => room.data());
			}
			return [];
		}
	} catch (error) {
		alert("Error occured while loading user created rooms");
		console.error(error);
	}
}

export const getUser = (): User | null => {
	const storedUser = window.localStorage.getItem("user");
	if (storedUser) {
		return JSON.parse(storedUser);
	}
	return null;
}

export const submitResult = async (result: string, userId: string) => {

}