import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import React, { useState } from "react";

import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

const PRIMARY_COLOR = "#ab39c6";

const LoginScreen = () => {
	const [loaded, error] = useFonts({
		PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
		PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
		PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
		PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
	});
	const [username, setUsername] = useState(() => "");
	const [password, setPassword] = useState(() => "");
	const navigation = useNavigation();

	if (!loaded) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			style={styles.main}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<Text style={styles.title}>FlashCards</Text>
			<View>
				<Text style={styles.usernameLabel}>Username</Text>
				<TextInput
					style={styles.username}
					value={username}
					placeholder="Enter your username"
					onChangeText={(value) => {
						setUsername(value);
					}}
				/>
			</View>
			<View>
				<Text style={styles.usernameLabel}>Password</Text>
				<TextInput
					style={styles.username}
					value={password}
					placeholder="Enter your password"
					secureTextEntry={true}
					onChangeText={(value) => {
						setPassword(value);
					}}
				/>
			</View>

			<TouchableOpacity
				style={styles.loginButton}
				onPress={() => {
					navigation.navigate("Flashcards");
				}}
			>
				<View>
					<Text style={styles.loginButtonText}>Login</Text>
				</View>
			</TouchableOpacity>

			<View style={styles.footerView}>
				<Text style={styles.footerText1}>Don't have an account yet?</Text>
				<TouchableOpacity>
					<Text style={styles.footerText2}>Sign Up</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "center",
		gap: 15,
		paddingHorizontal: 15,
	},
	title: {
		fontSize: 32,
		textAlign: "center",
		fontFamily: "PoppinsBold",
		color: PRIMARY_COLOR,
	},
	usernameContainer: {},
	username: {
		height: 50,
		borderWidth: 1,
		padding: 10,
		borderRadius: 8,
		fontFamily: "PoppinsRegular",
	},
	usernameLabel: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
	},
	loginButton: {
		backgroundColor: PRIMARY_COLOR,
		zIndex: 2,
		borderRadius: 50,
	},
	loginButtonText: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
		textAlign: "center",
		paddingVertical: 15,
		color: "white",
	},
	footerView: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 5,
	},
	footerText1: {
		fontFamily: "PoppinsMedium",
		fontSize: 16,
	},
	footerText2: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
		color: PRIMARY_COLOR,
	},
});
