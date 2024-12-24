import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Modal,
	TouchableWithoutFeedback,
	Dimensions,
	Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { SignInContext } from "../contexts/SignInContext";

const PRIMARY_COLOR = "#ab39c6";
const CURRENT_HEIGHT = Dimensions.get("window").height;

const FlashcardItem = ({ category, description, no_of_items }) => {
	return (
		<View style={styles.flashcard}>
			<Text style={styles.flashcardTitle}>{category}</Text>
			<Text style={styles.flashcardDescription}>{description}</Text>
		</View>
	);
};
const Flashcards = () => {
	const [loaded, error] = useFonts({
		PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
		PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
		PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
		PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
	});

	const { dispatch } = useContext(SignInContext);

	const [flashcards, setFlashcards] = useState([
		{
			category: "Marvel Superheroes",
			description:
				"A questions about marvel superheroes. This includes the power, the origin, and the land of the heroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
	]);
	const [modalVisible, setModalVisible] = useState(false);

	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() =>
						Alert.alert(
							"Logout",
							"Are you sure you want to logout?",
							[
								{
									text: "Yes",
									onPress: () => dispatch({ type: "LOGOUT" }),
									style: "default",
								},
								{
									text: "Cancel",
									onPress: () => console.log("Cancel"),
									style: "cancel",
								},
							],
							{
								cancelable: true,
								onDismiss: () => console.log("Dismiss"),
							}
						)
					}
				>
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
		});
	}, [navigation]);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.flashcards}>
				<TextInput style={styles.searchBar} placeholder="Search..." />
				<FlatList
					data={flashcards}
					renderItem={(flashcard) => (
						<FlashcardItem
							category={flashcard.item.category}
							description={flashcard.item.description}
						/>
					)}
					contentContainerStyle={{ paddingBottom: 20 }}
				/>

				<TouchableOpacity
					style={styles.fixedButton}
					onPress={() => {
						setModalVisible(true);
					}}
				>
					<Text
						style={{
							textAlign: "center",
							fontFamily: "PoppinsMedium",
							fontSize: 32,
							color: "white",
						}}
					>
						+
					</Text>
				</TouchableOpacity>

				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(false);
					}}
				>
					<View
						style={styles.modalBackdrop}
						onStartShouldSetResponder={(event) => setModalVisible(false)}
					>
						<TouchableWithoutFeedback
							onPress={(event) => event.stopPropagation()}
						>
							<View style={styles.modalContent}>
								<Text style={styles.modalContentTitle}>New Category</Text>
								<View style={styles.formSection}>
									<Text style={styles.formLabel}>Category</Text>
									<TextInput
										style={styles.formTextInput}
										placeholder="Ex. National Heroes"
									/>
								</View>
								<View style={styles.formSection}>
									<Text style={styles.formLabel}>Description</Text>
									<TextInput
										style={styles.formTextInput}
										placeholder="Ex. National Heroes"
									/>
								</View>
								<TouchableOpacity style={styles.addCategoryButton}>
									<View>
										<Text style={styles.addCategoryButtonText}>Add</Text>
									</View>
								</TouchableOpacity>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</Modal>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default Flashcards;

const styles = StyleSheet.create({
	modalBackdrop: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: "white",
		width: "100%",
		height: CURRENT_HEIGHT * 0.5,
		shadowColor: "#000", // Shadow color
		shadowOffset: { width: 0, height: 25 },
		shadowOpacity: 1, // Shadow opacity
		shadowRadius: 1, // Shadow blur radius
		elevation: 5,
		borderRadius: 15,
		paddingTop: 25,
		paddingHorizontal: 15,
		gap: 15,
	},
	modalContentTitle: {
		fontFamily: "PoppinsBold",
		fontSize: 20,
		color: PRIMARY_COLOR,
	},
	formSection: {
		marginTop: 5,
	},
	formLabel: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
	},
	addCategoryButton: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 50,
	},
	addCategoryButtonText: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
		textAlign: "center",
		paddingVertical: 15,
		color: "white",
	},
	formTextInput: {
		height: 50,
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		borderRadius: 8,
		fontFamily: "PoppinsRegular",
	},
	searchBar: {
		height: 50,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		borderRadius: 8,
		fontFamily: "PoppinsRegular",
	},
	flashcards: {
		paddingHorizontal: 15,
		paddingTop: 15,
		flex: 1,
		position: "relative",
	},
	flashcard: {
		gap: 5,
		backgroundColor: "white",
		padding: 25,
		borderRadius: 15,
		marginBottom: 10,
	},
	flashcardTitle: {
		fontFamily: "PoppinsBold",
		fontSize: 20,
	},
	flashcardDescription: {
		fontFamily: "PoppinsRegular",
	},
	fixedButton: {
		position: "absolute",
		bottom: 30,
		right: 20,
		backgroundColor: PRIMARY_COLOR,
		width: 60,
		height: 60,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 5, // For Android shadow
	},
});
