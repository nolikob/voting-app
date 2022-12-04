export interface RoomDetailType {
	readonly amountOfVotesPerUser: number;
	readonly authorId: string;
	readonly votingOptions: string[];
	readonly voters: string[];
	readonly roomName: string;
}