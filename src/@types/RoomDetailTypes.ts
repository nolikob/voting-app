export interface RoomDetailType {
	readonly amountOfVotesPerUser: number;
	readonly authorId: string;
	readonly votingOptions: VotingOption[];
	readonly voters: string[];
	readonly roomName: string;
}

export interface VotingOption {
	readonly optionName: string;
	readonly amountOfVotes: number;
}