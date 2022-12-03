import { createBrowserRouter, redirect } from "react-router-dom";
import { AdminPage } from "./pages/admin";
import { Root, Login, JoinRoom, RoomDetail } from "./pages/index";
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
		path: "/detail/:id",
		loader: loggedInGuard,
		element: <RoomDetail />
	},
	{
		path: "/admin",
		loader: loggedInGuard,
		element: <AdminPage />
	},
	{
		path: "*",
		loader: async () => {
			throw redirect("/")
		}
	}
]);