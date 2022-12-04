import { createBrowserRouter, redirect } from "react-router-dom";
import { AdminPage } from "./pages/admin";
import { CreateRoomPage } from "./pages/admin/createRoom";
import { Root, Login, JoinRoom, RoomDetail } from "./pages/index";
import { loader as roomDetailLoader } from "./pages/room-detail";
import { alreadyLoggedInGuard, loggedInGuard } from "./pages/routeGuards";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
	},
	{
		path: "/login",
		loader: alreadyLoggedInGuard,
		element: <Login />
	},
	{
		path: "/join",
		loader: loggedInGuard,
		element: <JoinRoom />
	},
	{
		path: "/room/:id",
		loader: async ({ params }) => {
			await loggedInGuard();
			return await roomDetailLoader({ params })
		},
		element: <RoomDetail />
	},
	{
		path: "/admin",
		loader: loggedInGuard,
		element: <AdminPage />,
		children: [
			{
				path: "/admin/create",
				element: <CreateRoomPage />
			}
		]
	},
	{
		path: "*",
		loader: async () => {
			throw redirect("/")
		}
	}
]);