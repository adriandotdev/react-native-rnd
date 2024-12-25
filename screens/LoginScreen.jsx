import React, { useEffect } from "react";
import Constants from "expo-constants";

import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import { SignInContext } from "../contexts/SignInContext";

import axios from "axios";

const PRIMARY_COLOR = "#ab39c6";
const URL = process.env.EXPO_PUBLIC_API_URL;

const LoginScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
	} = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
	});
	const navigation = useNavigation();
	const [loaded, error] = useFonts({
		PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
		PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
		PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
		PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
	});
	const { dispatch } = React.useContext(SignInContext);

	if (!loaded) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(`${URL}/api/v1/auth/login`, {
				username: data.username,
				password: data.password,
			});

			dispatch({
				type: "LOGIN",
				payload: { user: { username: data.username } },
			});
		} catch (err) {
			console.log(err.response.data);
		}
	};

	// For testing purposes
	useEffect(() => {
		setValue("username", "username");
		setValue("password", "password");
	}, []);
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flexGrow: 1 }}>
				<KeyboardAvoidingView
					style={styles.main}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
				>
					<Text style={styles.title}>FlashCards</Text>

					<View>
						<Text style={styles.textInputLabel}>Username</Text>
						<Controller
							control={control}
							rules={{ required: "Please provide your username" }}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={
										errors.username ? styles.textInputError : styles.textInput
									}
									placeholder="Enter your username"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name="username"
						/>
						{errors?.username && (
							<View>
								<Text style={styles.formErrorMessage}>
									{errors.username.message}
								</Text>
							</View>
						)}
					</View>
					<View>
						<Text style={styles.textInputLabel}>Password</Text>
						<Controller
							control={control}
							rules={{ required: "Please provide your password" }}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={
										errors.password ? styles.textInputError : styles.textInput
									}
									placeholder="Enter your password"
									secureTextEntry={true}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name="password"
						/>
						{errors?.password && (
							<View>
								<Text style={styles.formErrorMessage}>
									{errors.password.message}
								</Text>
							</View>
						)}
					</View>

					<TouchableOpacity
						style={styles.loginButton}
						onPress={handleSubmit(onSubmit)}
					>
						<View>
							{isSubmitting ? (
								<ActivityIndicator
									style={styles.loginButtonText}
									size="small"
									color="white"
								/>
							) : (
								<Text style={styles.loginButtonText}>Login</Text>
							)}
						</View>
					</TouchableOpacity>

					<View style={styles.footerView}>
						<Text style={styles.footerText1}>Don't have an account yet?</Text>
						<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
							<Text style={styles.footerText2}>Sign Up</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</SafeAreaProvider>
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
	textInput: {
		height: 50,
		borderWidth: 0.5,
		borderColor: "#ccc",
		padding: 10,
		borderRadius: 8,
		fontFamily: "PoppinsRegular",
	},
	textInputError: {
		height: 50,
		borderWidth: 1,
		padding: 10,
		borderRadius: 8,
		fontFamily: "PoppinsRegular",
		borderColor: "red",
	},
	textInputLabel: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
	},
	loginButton: {
		backgroundColor: PRIMARY_COLOR,
		zIndex: 2,
		borderRadius: 50,
		marginTop: 15,
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
	formErrorMessage: {
		color: "red",
		fontFamily: "PoppinsMedium",
	},
});
