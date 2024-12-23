import { useDeviceOrientation } from "@react-native-community/hooks";
import WelcomeScreen from "./screens/WelcomeScreen";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import Flashcards from "./screens/Flashcards";
import { Button } from "react-native";

const ProfileTabs = createBottomTabNavigator({
	screens: {
		Flashcards: Flashcards,
		Profile: Flashcards,
	},
});

const RootStack = createNativeStackNavigator({
	initialRouteName: "Home",
	screenOptions: {
		headerStyle: { backgroundColor: "white" },
		headerTitleStyle: {
			color: "black",
			fontWeight: "bold",
			fontFamily: "Poppins",
		},
		headerTintColor: "black",
		headerLeft: () => <></>,
	},
	screens: {
		Home: {
			screen: WelcomeScreen,
			options: {
				headerShown: false,
			},
		},
		Login: {
			screen: LoginScreen,
			options: {
				headerShown: false,
			},
		},
		Flashcards: {
			screen: ProfileTabs,
			options: {
				headerShown: false,
			},
		},
	},
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
	console.log(useDeviceOrientation());

	return <Navigation />;
}
