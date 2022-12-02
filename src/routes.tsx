import { createBrowserRouter } from "react-router-dom";
import { Root, Login, JoinRoom, RoomDetail } from "./pages/index";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />
	},
	{
		path: "/login",
		element: <Login />
	},
	{
		path: "/join",
		element: <JoinRoom />
	},
	{
		path: "/detail/:id",
		element: <RoomDetail />
	}
]);