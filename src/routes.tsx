import { EditRoomPage } from "pages/admin/editRoom";
import { createBrowserRouter, redirect } from "react-router-dom";
import { AdminPage } from "./pages/admin";
import { CreateRoomPage } from "./pages/admin/createRoom";
import { Root, Login, JoinRoom, RoomDetailPage } from "./pages/index";
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
		loader: async (props) => {
			return await loggedInGuard(props);
		},
		element: <RoomDetailPage />
	},
	{
		path: "/admin",
		loader: async (props) => {
			return await loggedInGuard(props);
		},
		element: <AdminPage />,
		children: [
			{
				path: "/admin/create",
				element: <CreateRoomPage />
			},
			{
				path: "/admin/edit/:id",
				element: <EditRoomPage />
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