import { Button, createToast, InputField, Stack, Text } from "@kiwicom/orbit-components";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RoomDetailType } from "types/RoomDetailTypes";
import { updateRoom } from '../firebaseActions';

interface FormInputs {
	readonly roomName: string;
	readonly votingOptions: string;
}

export const EditRoomForm = ({ roomDetail }: { roomDetail: RoomDetailType }) => {
	const votingOptions = roomDetail.votingOptions.map(({ optionName }) => optionName).join(", ");

	const { control, handleSubmit, formState } = useForm<FormInputs>({
		reValidateMode: "onChange",
		shouldFocusError: true,
		defaultValues: {
			roomName: roomDetail.roomName,
			votingOptions,
		},
		criteriaMode: "all"
	});

	const onSubmit: SubmitHandler<FormInputs> = async ({ roomName, votingOptions }) => {
		try {
			await updateRoom({
				roomName,
				votingOptions,
				amountOfVotesPerUser: 1,
				authorId: roomDetail.authorId,
				roomId: roomDetail.roomId
			});

			createToast(`Room ${roomName} was updated`)

		} catch (error) {

		}
	};
	const { errors } = formState;

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack direction="column">
				<Controller
					name="roomName"
					control={control}
					rules={{
						required: "This field is required"
					}}
					render={({ field }) => <InputField label="Room name" placeholder="Example: Lunch room" {...field} />}
				/>
				{errors.roomName?.message && (
					<Text spaceAfter="small" type="critical">
						{errors.roomName.message}
					</Text>
				)}
				<Controller
					name="votingOptions"
					control={control}
					rules={{
						required: "This field is required"
					}}
					render={({ field }) => <InputField label="Voting options" placeholder="Example: John, Jane, Wednesday" {...field} />}
				/>
				{errors.votingOptions?.message && (
					<Text spaceAfter="small" type="critical">
						{errors.votingOptions.message}
					</Text>
				)}
				<Button type="primary" submit>
					Create room
				</Button>
			</Stack>
		</form>
	);
}