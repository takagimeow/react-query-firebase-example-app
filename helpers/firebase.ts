import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { initializeApp } from "firebase/app";
import Constants from "expo-constants";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

type Config = {
	apiKey: string | undefined;
	authDomain: string | undefined;
	databaseURL?: string | undefined;
	projectId: string | undefined;
	storageBucket: string | undefined;
	messagingSenderId: string | undefined;
	appId: string | undefined;
	measurementId: string | undefined;
};

const config: Config = {
	apiKey: Constants.manifest?.extra?.firebase.apiKey,
	authDomain: Constants.manifest?.extra?.firebase.authDomain,
	projectId: Constants.manifest?.extra?.firebase.projectId,
	storageBucket: Constants.manifest?.extra?.firebase.storageBucket,
	messagingSenderId: Constants.manifest?.extra?.firebase.messagingSenderId,
	appId: Constants.manifest?.extra?.firebase.appId,
	measurementId: Constants.manifest?.extra?.firebase.measurementId
};

const firebase = initializeApp({
	projectId: config.projectId,
	apiKey: config.apiKey,
	authDomain: config.authDomain,
	storageBucket: config.storageBucket
});

export const auth = getAuth(firebase);
connectAuthEmulator(auth, "http://localhost:9099");
export const functions = getFunctions(firebase);
connectFunctionsEmulator(functions, "localhost", 5001);
