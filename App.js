import { useDeviceOrientation } from "@react-native-community/hooks";
import WelcomeScreen from "./screens/WelcomeScreen";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import Flashcards from "./screens/Flashcards";

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
	},
	screens: {
		Home: {
			screen: WelcomeScreen,
		},
		Login: {
			screen: LoginScreen,
		},
		Flashcards: {
			screen: Flashcards,
		},
	},
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
	console.log(useDeviceOrientation());

	return <Navigation />;
}
