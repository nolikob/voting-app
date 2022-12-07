import { Heading, Text, Stack, ChoiceGroup, Tag, Radio, Button, Alert } from "@kiwicom/orbit-components";
import type { RoomDetailType } from "../@types/RoomDetailTypes";
import { getUser, submitResult } from "firebaseActions";
import { FC, useState } from "react";

type Props = { id: string } & Omit<RoomDetailType, "authorId">;

export const RoomDetail: FC<Props> = ({ roomName, amountOfVotesPerUser, votingOptions, voters, id }) => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [submitDisabled, setSubmitDisabled] = useState(false);
	const user = getUser();
	const userAlreadyVoted = user ? voters.includes(user.uid) : false;

	return <Stack flex direction="column">
		<Stack direction="row" justify="between">
			<Heading>{roomName}</Heading>
			<Text as="div">
				Amount of votes per user: <Tag>{amountOfVotesPerUser}</Tag>
			</Text>
		</Stack>
		{userAlreadyVoted &&
			<Alert type="info">
				You have already voted
			</Alert>
		}
		<ChoiceGroup onChange={({ currentTarget: { name } }) => setSelectedOption(name)}>
			{votingOptions.map(option => <Radio
				key={option.optionName}
				name={option.optionName}
				label={option.optionName}
				checked={selectedOption === option.optionName}
			/>)}
		</ChoiceGroup>

		<Button
			type="primarySubtle"
			disabled={userAlreadyVoted || selectedOption === null || submitDisabled}
			onClick={async () => {
				setSubmitDisabled(true);
				if (user !== null && id && selectedOption !== null) {
					await submitResult({
						roomId: id,
						result: selectedOption,
						userId: user.uid
					});
				}
			}}
		>
			Vote
		</Button>
	</Stack>;
}