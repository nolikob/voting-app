export interface RoomDetailType {
	readonly amountOfVotesPerUser: number;
	readonly authorId: string;
	readonly votingOptions: VotingOption[];
	readonly votedUids: string[];
}

interface VotingOption {
	readonly id: string;
	readonly name: string;
	readonly votes: number;
}