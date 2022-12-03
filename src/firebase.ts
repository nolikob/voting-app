// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, addDoc, where, getDocs } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const {
	REACT_APP_FIREBASE_API_KEY,
	REACT_APP_AUTH_DOMAIN,
	REACT_APP_PROJECT_ID,
	REACT_APP_STORAGE_BUCKET,
	REACT_APP_MESSAGING_SENDER_ID,
	REACT_APP_APP_ID,
	REACT_APP_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
	apiKey: REACT_APP_FIREBASE_API_KEY,
	authDomain: REACT_APP_AUTH_DOMAIN,
	projectId: REACT_APP_PROJECT_ID,
	storageBucket: REACT_APP_STORAGE_BUCKET,
	messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
	appId: REACT_APP_APP_ID,
	measurementId: REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		window.localStorage.setItem("user", JSON.stringify(user));
		const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await addDoc(collection(firestore, "users"), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
	}
};

export const isUserLoggedIn = (): boolean => {
	return window.localStorage.getItem("user") ? true : false;
}

export const logout = () => {
	signOut(auth);
	window.localStorage.removeItem("user");
	window.location.reload();
};
