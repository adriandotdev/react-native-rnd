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
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { SignInContext } from "../contexts/SignInContext";

const PRIMARY_COLOR = "#ab39c6";
const CURRENT_HEIGHT = Dimensions.get("window").height;

const Product = ({ product, price, description }) => {
	return (
		<View style={styles.product}>
			<Text style={styles.productTitle}>{product}</Text>
			<Text style={styles.productTitle}>{price}</Text>
			<Text style={styles.productDescription}>{description}</Text>
		</View>
	);
};
const Products = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		resetField,
	} = useForm({
		defaultValues: {
			name: "",
			price: "",
			description: "",
		},
	});

	const [loaded, error] = useFonts({
		PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
		PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
		PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
		PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
	});

	const { dispatch } = useContext(SignInContext);

	const [products, setProducts] = useState([
		{
			product: "Red Horse (Big)",
			description:
				"A questions about marvel superheroes. This includes the power, the origin, and the land of the heroes",
			price: 130,
		},
		{
			product: "Red Horse (Small)",
			description: "A questions about marvel superheroes",
			price: 130,
		},
	]);
	const [modalVisible, setModalVisible] = useState(false);

	const navigation = useNavigation();

	const onSubmit = async (data) => {};

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
					data={products}
					renderItem={(product) => (
						<Product
							product={product.item.product}
							price={product.item.price}
							description={product.item.description}
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
						resetField("name");
						resetField("price");
						resetField("description");
					}}
				>
					<View
						style={styles.modalBackdrop}
						onStartShouldSetResponder={(event) => {
							setModalVisible(false);
							resetField("name");
							resetField("price");
							resetField("description");
						}}
					>
						<TouchableWithoutFeedback
							onPress={(event) => event.stopPropagation()}
						>
							<KeyboardAvoidingView
								behavior={Platform.OS === "ios" ? "padding" : "height"}
							>
								<View style={styles.modalContent}>
									<ScrollView
										contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
									>
										<Text style={styles.modalContentTitle}>New Product</Text>

										<View>
											<Text style={styles.textInputLabel}>Name</Text>
											<Controller
												control={control}
												rules={{ required: "Please provide the product name" }}
												render={({ field: { onChange, onBlur, value } }) => (
													<TextInput
														style={
															errors.name
																? styles.textInputError
																: styles.textInput
														}
														placeholder="Enter the product name "
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
											<Text style={styles.textInputLabel}>Price</Text>
											<Controller
												control={control}
												rules={{ required: "Please provide the product price" }}
												render={({ field: { onChange, onBlur, value } }) => (
													<TextInput
														style={
															errors.price
																? styles.textInputError
																: styles.textInput
														}
														placeholder="Enter the product price"
														onBlur={onBlur}
														onChangeText={onChange}
														value={value}
														keyboardType="numeric"
													/>
												)}
												name="price"
											/>
											{errors?.price && (
												<View>
													<Text style={styles.formErrorMessage}>
														{errors.price.message}
													</Text>
												</View>
											)}
										</View>

										<View>
											<Text style={styles.textInputLabel}>Description</Text>
											<Controller
												control={control}
												rules={{
													required: "Please provide the product description",
												}}
												render={({ field: { onChange, onBlur, value } }) => (
													<TextInput
														style={
															errors.description
																? styles.textInputError
																: styles.textInput
														}
														placeholder="Enter the product description"
														onBlur={onBlur}
														onChangeText={onChange}
														value={value}
													/>
												)}
												name="description"
											/>
											{errors?.description && (
												<View>
													<Text style={styles.formErrorMessage}>
														{errors.description.message}
													</Text>
												</View>
											)}
										</View>

										<TouchableOpacity
											style={styles.addCategoryButton}
											onPress={handleSubmit(onSubmit)}
										>
											<View>
												<Text style={styles.addCategoryButtonText}>Add</Text>
											</View>
										</TouchableOpacity>
									</ScrollView>
								</View>
							</KeyboardAvoidingView>
						</TouchableWithoutFeedback>
					</View>
				</Modal>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default Products;

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
		marginTop: 15,
	},
	addCategoryButtonText: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
		textAlign: "center",
		paddingVertical: 15,
		color: "white",
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
		fontSize: 16,
	},
	formErrorMessage: {
		color: "red",
		fontFamily: "PoppinsMedium",
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
	product: {
		gap: 5,
		backgroundColor: "white",
		padding: 25,
		borderRadius: 15,
		marginBottom: 10,
	},
	productTitle: {
		fontFamily: "PoppinsBold",
		fontSize: 20,
	},
	productDescription: {
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
