import { firestore } from "./firebase"
import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	collection,
	addDoc,
	query,
	where,
	getDocs,
	arrayUnion,
} from '@firebase/firestore';
import { useDocumentData, useCollectionData } from "react-firebase-hooks/firestore";
import { RoomDetailType } from './@types/RoomDetailTypes';
import { User } from "firebase/auth";
import { createToast } from '@kiwicom/orbit-components';

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

export const useGetRoomData = (roomId: string) => useDocumentData(doc(firestore, "rooms", roomId))

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
			votingOptions: votingOptions.split(",").map(option => ({ optionName: option.trim(), amountOfVotes: 0 })),
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

export const useGetUserCreatedRooms = () => {
	const user = getUser();
	const q = query(collection(firestore, "rooms"), where("authorId", "==", user?.uid));
	return useCollectionData(q);
}

export const getUser = (): User | null => {
	const storedUser = window.localStorage.getItem("user");
	if (storedUser) {
		return JSON.parse(storedUser);
	}
	return null;
}

interface SubmitResultProps {
	readonly result: string;
	readonly userId: string;
	readonly roomId: string;
}

export const submitResult = async ({ result, roomId, userId }: SubmitResultProps) => {
	const roomRef = doc(collection(firestore, "rooms"), roomId);
	try {
		await updateDoc(roomRef, {
			voters: arrayUnion(userId)
		});
		createToast("Vote submitted");
	} catch (error) {
		console.error(error);
	}
}