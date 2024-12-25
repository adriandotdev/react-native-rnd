import {
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
	BackHandler,
} from "react-native";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const PRIMARY_COLOR = "#ab39c6";
const URL = "https://9275-203-189-118-82.ngrok-free.app";

const SignUpScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm({
		defaultValues: {
			name: "",
			username: "",
			password: "",
			confirm_password: "",
		},
	});
	const navigation = useNavigation();
	const [loaded, error] = useFonts({
		PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
		PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
		PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
		PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
	});

	const onSubmit = async (data) => {
		await axios.post("");
	};

	const password = watch("password");

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				navigation.navigate("Home");

				return true;
			}
		);

		return () => backHandler.remove();
	}, []);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.safeAreaView}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
				>
					<ScrollView contentContainerStyle={styles.scrollView}>
						<Text style={styles.title}>Sign Up</Text>

						<View>
							<Text style={styles.textInputLabel}>Name</Text>
							<Controller
								control={control}
								rules={{ required: "Please provide your name" }}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={
											errors.name ? styles.textInputError : styles.textInput
										}
										placeholder="Enter your name"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="name"
							/>
							{errors?.name && (
								<View>
									<Text style={styles.formErrorMessage}>
										{errors.name.message}
									</Text>
								</View>
							)}
						</View>

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

						<View>
							<Text style={styles.textInputLabel}>Confirm Password</Text>
							<Controller
								control={control}
								rules={{
									required: "Please confirm your password",
									validate: (value) =>
										value === password || "Password do not match",
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={
											errors.confirm_password
												? styles.textInputError
												: styles.textInput
										}
										placeholder="Confirm your password"
										secureTextEntry={true}
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="confirm_password"
							/>
							{errors?.confirm_password && (
								<View>
									<Text style={styles.formErrorMessage}>
										{errors.confirm_password.message}
									</Text>
								</View>
							)}
						</View>
						<TouchableOpacity
							style={styles.button}
							onPress={handleSubmit(onSubmit)}
						>
							<View>
								{isSubmitting ? (
									<ActivityIndicator
										style={styles.buttonText}
										size="small"
										color="white"
									/>
								) : (
									<Text style={styles.buttonText}>Sign Up</Text>
								)}
							</View>
						</TouchableOpacity>

						<View style={styles.footerView}>
							<Text style={styles.footerText1}>Already have an account?</Text>
							<TouchableOpacity onPress={() => navigation.navigate("Login")}>
								<Text style={styles.footerText2}>Sign In</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default SignUpScreen;

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "center",
		gap: 15,
		paddingHorizontal: 15,
	},
	scrollView: {
		gap: 15,
	},

	title: {
		fontFamily: "PoppinsBold",
		color: PRIMARY_COLOR,
		textAlign: "center",
		fontSize: 32,
	},
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
		fontSize: 14,
		color: "#4e4949",
	},
	button: {
		backgroundColor: PRIMARY_COLOR,
		zIndex: 2,
		borderRadius: 50,
		marginTop: 15,
	},
	buttonText: {
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
