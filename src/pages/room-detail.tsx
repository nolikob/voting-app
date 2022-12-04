import { Text } from '@kiwicom/orbit-components';
import { Suspense } from 'react';
import { Await, defer, Params, useLoaderData } from 'react-router-dom';
import { Layout } from '../layout/index';
import { getRoomData } from './firebaseActions';
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
	const data = useLoaderData() as { roomData: RoomDetailType };

	return (
		<Layout>
			<Suspense
				fallback={<Text align="center">Loading</Text>}
			>
				<Await
					resolve={data.roomData}
					errorElement={<Text align="center">
						Failed to load room data
					</Text>}
				>
					{(roomData) => (
						<pre>
							<>
								Test
								{console.log(roomData)}
							</>
						</pre>
					)}
				</Await>
			</Suspense>
		</Layout>
	)
}