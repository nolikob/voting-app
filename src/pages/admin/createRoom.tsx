import { Button, Stack, Text, InputField, createToast } from "@kiwicom/orbit-components";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createRoom } from "../../firebaseActions";

interface FormInputs {
	readonly roomName: string;
	readonly votingOptions: string;
	readonly amountOfVotesPerUser: number;
}

export const CreateRoomPage = () => {
	const { control, handleSubmit, formState, reset } = useForm<FormInputs>({
		reValidateMode: "onChange",
		shouldFocusError: true,
		defaultValues: {
			roomName: "",
			votingOptions: "",
			amountOfVotesPerUser: 1
		},
		criteriaMode: "all"
	});

	const onSubmit: SubmitHandler<FormInputs> = async (data) => {
		try {
			const response = await createRoom(data);

			if (response) {
				createToast(`Room ${data.roomName} was created`)
				reset();
			}
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
	)
}
