import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

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

	const [flashcards, setFlashcards] = useState([
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
		{
			category: "Marvel Superheroes",
			description: "A questions about marvel superheroes",
			no_of_items: 5,
		},
	]);

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

				<TouchableOpacity style={styles.fixedButton}>
					<Text
						style={{
							textAlign: "center",
							fontFamily: "PoppinsMedium",
							fontSize: 32,
						}}
					>
						+
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default Flashcards;

const styles = StyleSheet.create({
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
		backgroundColor: "#007bff",
		width: 50,
		height: 50,
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
