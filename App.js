import { useDeviceOrientation } from "@react-native-community/hooks";
import WelcomeScreen from "./screens/WelcomeScreen";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";

const RootStack = createNativeStackNavigator({
	initialRouteName: "Home",
	screenOptions: {
		headerStyle: { backgroundColor: "#052024" },
		headerTitleStyle: {
			color: "white",
			fontWeight: "bold",
			fontFamily: "Poppins",
		},
		headerTintColor: "white",
	},
	screens: {
		Home: {
			screen: WelcomeScreen,
		},
		Login: {
			screen: LoginScreen,
		},
	},
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
	console.log(useDeviceOrientation());

	return <Navigation />;
}
