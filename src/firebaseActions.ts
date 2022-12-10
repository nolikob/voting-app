import { firestore } from "./firebase"
import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	deleteDoc,
	collection,
	addDoc,
	query,
	where,
	arrayUnion,
	arrayRemove
} from '@firebase/firestore';
import { useDocumentData, useCollectionData } from "react-firebase-hooks/firestore";
import { RoomDetailType } from './types/RoomDetailTypes';
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
	const user = getUser();

	if (user) {
		const newRoom: Omit<RoomDetailType, "roomId"> = {
			amountOfVotesPerUser,
			roomName,
			votingOptions: createVotingOptions(votingOptions),
			authorId: user.uid,
			voters: []
		}

		const newCreatedRoom = await addDoc(collection(firestore, "rooms"), {
			...newRoom
		});

		await updateDoc(newCreatedRoom, {
			roomId: newCreatedRoom.id
		});

		return newCreatedRoom;
	}
};



interface UpdateRoomProps extends CreateRoomProps {
	readonly roomId: string;
	readonly authorId: string;
}

export const updateRoom = async ({ amountOfVotesPerUser, roomName, roomId, votingOptions, authorId }: UpdateRoomProps) => {
	return await setDoc(doc(firestore, "rooms", roomId), {
		amountOfVotesPerUser,
		roomName,
		authorId,
		voters: [],
		votingOptions: createVotingOptions(votingOptions),
		roomId,
	})
};

export const removeRoom = async (roomId: string) => {
	// eslint-disable-next-line no-restricted-globals
	if (confirm("Delete room?") === true) {
		await deleteDoc(doc(firestore, "rooms", roomId))
		createToast("Room deleted");
	}
};

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
		const roomData = (await getDoc(roomRef)).data();
		if (roomData) {
			const { votingOptions } = roomData as RoomDetailType;
			const updatedVotingOptions = [...votingOptions];
			const indexOfResult = updatedVotingOptions.findIndex(option => option.optionName === result)
			updatedVotingOptions.splice(indexOfResult, 1, {
				optionName: result,
				amountOfVotes: updatedVotingOptions[indexOfResult].amountOfVotes + 1
			});
			await updateDoc(roomRef, {
				votingOptions: arrayRemove(...votingOptions)
			})
			await updateDoc(roomRef, {
				voters: arrayUnion(userId),
				votingOptions: arrayUnion(...updatedVotingOptions),
			});
		}
		createToast("Vote submitted");
	} catch (error) {
		console.error(error);
	}
}

const createVotingOptions = (votingOptions: string) =>
	votingOptions.split(",").map(option => ({ optionName: option.trim(), amountOfVotes: 0 }))