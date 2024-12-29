// import { useDeviceOrientation } from "@react-native-community/hooks";
import WelcomeScreen from "./screens/WelcomeScreen";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import Products from "././screens/Products";
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SignInContext, SignInProvider } from "./contexts/SignInContext";
import SignUpScreen from "./screens/SignUpScreen";
import { ProductProvider } from "./contexts/ProductContext";

const ProfileTabs = createBottomTabNavigator({
	screens: {
		Products: {
			screen: Products,
			options: {
				headerRight: () => (
					<TouchableOpacity>
						<View style={{ paddingHorizontal: 15 }}>
							<Text
								style={{
									color: "red",
									fontFamily: "PoppinsMedium",
									textAlign: "center",
								}}
							>
								Logout
							</Text>
						</View>
					</TouchableOpacity>
				),
				tabBarStyle: {
					borderRadius: 15,
				},
			},
		},
		Profile: Products,
	},
});

const RootStack = createNativeStackNavigator({
	// initialRouteName: "Home",
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
			if: useIsSignedOut,
			screen: WelcomeScreen,
			options: {
				headerShown: false,
			},
		},
		Login: {
			if: useIsSignedOut,
			screen: LoginScreen,
			options: {
				headerShown: false,
			},
		},
		SignUp: {
			if: useIsSignedOut,
			screen: SignUpScreen,
			options: {
				headerShown: false,
			},
		},
		Flashcards: {
			if: useIsSignedIn,
			screen: ProfileTabs,
			options: {
				headerShown: false,
			},
		},
	},
});

const Navigation = createStaticNavigation(RootStack);

// Hooks
function useIsSignedIn() {
	const { state } = React.useContext(SignInContext);

	return state.isAuthenticated;
}

function useIsSignedOut() {
	const { state } = React.useContext(SignInContext);
	return !state.isAuthenticated;
}
// End of Hooks Region

export default function App() {
	return (
		<SignInProvider>
			<ProductProvider>
				<Navigation />
			</ProductProvider>
		</SignInProvider>
	);
}
