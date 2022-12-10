import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { isUserLoggedIn } from '../firebase';

export const alreadyLoggedInGuard = async () => {
	if (isUserLoggedIn()) {
		throw redirect("/join");
	}
	return null;
};

export const loggedInGuard = async (props: LoaderFunctionArgs) => {
	// const redirectURI = props.request.url;

	// if (!isUserLoggedIn() && redirectURI.indexOf("login") === -1) {
	// 	throw redirect(`/login?redirectURI=${redirectURI}`);
	// }

	if (!isUserLoggedIn()) {
		throw redirect("/login")
	}

	return null;
};