import { Heading, Skeleton, Text, Stack, ChoiceGroup, Tag, Radio, Button } from '@kiwicom/orbit-components';
import { Suspense, useState } from 'react';
import { Await, defer, Params, useLoaderData } from 'react-router-dom';
import { Layout } from '../layout/index';
import { getRoomData, getUser, submitResult } from './firebaseActions';
import { RoomDetailType } from '../@types/RoomDetailTypes';

export const loader = async ({ params }: { params: Params<string> }) => {
	try {
		if (params.id) {
			const roomDataPromise = getRoomData(params.id);

			return defer({
				roomData: roomDataPromise,
			})
		}
		return {
			roomData: null,
		};
	} catch (e) {
		throw e;
	}
}

export const RoomDetail = () => {
	// TODO: get rid of this once figured out how to infer type from loader
	const { roomData } = useLoaderData() as { roomData: RoomDetailType };
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [submitDisabled, setSubmitDisabled] = useState(false);
	const user = getUser();

	return (
		<Layout>
			<Suspense
				fallback={<Skeleton rows={3} rowOffset={15} rowHeight={10} />}
			>
				<Await
					resolve={roomData}
					errorElement={<Text align="center">
						Failed to load room data
					</Text>}
				>
					{({ roomName, amountOfVotesPerUser, votingOptions, voters }: RoomDetailType) => (
						<Stack flex direction="column">
							<Stack direction="row" justify="between">
								<Heading>{roomName}</Heading>
								<Text as="div">
									Amount of votes per user: <Tag>{amountOfVotesPerUser}</Tag>
								</Text>
							</Stack>
							<ChoiceGroup onChange={({ currentTarget: { name } }) => setSelectedOption(name)}>
								{votingOptions.map(option => <Radio
									key={option}
									name={option}
									label={option}
									checked={selectedOption === option}
								/>)}
							</ChoiceGroup>
							<Button
								type="primarySubtle"
								disabled={(user !== null && voters.includes(user.uid)) || selectedOption === null || submitDisabled}
								onClick={async () => {
									setSubmitDisabled(true);
									if (user !== null && selectedOption !== null) {
										await submitResult(selectedOption, user.uid)
									}
								}}
							>
								Submit vote
							</Button>
						</Stack>
					)}
				</Await>
			</Suspense>
		</Layout>
	)
}