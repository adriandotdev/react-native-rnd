import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import {
	ImageBackground,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	Platform,
} from "react-native";

function WelcomeScreen() {
	const [loaded, error] = useFonts({
		PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
		PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
		PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
		PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
	});
	const navigation = useNavigation();

	if (!loaded) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<>
			<ImageBackground
				style={styles.background}
				source={require("../assets/smart-me-ag-j2E-2YQe_c8-unsplash (1).jpg")}
			>
				<View>
					<Text
						style={{
							zIndex: 2,
							fontSize: 40,
							fontFamily: "PoppinsBold",
							textAlign: "center",
						}}
					>
						FlashYourCards
					</Text>
					<Text
						style={{
							zIndex: 2,
							fontSize: 15,
							fontFamily: "PoppinsBold",
							textAlign: "center",
						}}
					>
						Everything with your own cards
					</Text>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.loginButton}
						onPress={() => {
							navigation.navigate("Login");
						}}
					>
						<View>
							<Text style={styles.loginButtonText}>Login</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.signupButton}
						onPress={() => console.log("Login")}
					>
						<View>
							<Text style={styles.signupButtonText}>Sign Up</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={styles.backgroundDrop}></View>
			</ImageBackground>
		</>
	);
}

export default WelcomeScreen;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		position: "relative",
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingBottom: 20,
		gap: 10,
	},
	buttonContainer: {
		gap: 15,
	},
	loginButton: {
		backgroundColor: "#052024",
		width: "80%",
		zIndex: 2,
		borderRadius: 50,
	},
	loginButtonText: {
		fontWeight: "bold",
		fontFamily: "Helvetica",
		fontSize: 16,
		textAlign: "center",
		padding: 20,
		color: "white",
	},
	signupButton: {
		backgroundColor: "white",
		width: "80%",
		zIndex: 2,
		borderRadius: 50,
	},
	signupButtonText: {
		fontWeight: "bold",
		fontFamily: "Helvetica",
		fontSize: 16,
		textAlign: "center",
		padding: 20,
		color: "black",
	},
	backgroundDrop: {
		flex: 1,
		position: "absolute",
		backgroundColor: "#ccc",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0.5,
	},
});
