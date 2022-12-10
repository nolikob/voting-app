import { VotingOption } from "../types/RoomDetailTypes";
import { FC } from "react";
import { BadgePrimitive, Stack, Text } from "@kiwicom/orbit-components";

export const Results: FC<{ results: VotingOption[] }> = ({ results }) => (
	<Stack direction="column">
		{results.map(result => <Stack key={result.optionName} justify="between" align="center">
			<Text>
				{result.optionName}
			</Text>
			<BadgePrimitive>
				{result.amountOfVotes}
			</BadgePrimitive>
		</Stack>)}
	</Stack>
)