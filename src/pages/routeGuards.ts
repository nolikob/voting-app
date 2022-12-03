import { redirect } from "react-router-dom";
import { isUserLoggedIn } from "../firebase";

export const alreadyLoggedInGuard = async () => {
	if (isUserLoggedIn()) {
		throw redirect("/join");
	}
	return null;
};

export const loggedInGuard = async () => {
	if (!isUserLoggedIn()) {
		throw redirect("/login");
	}
	return null;
};