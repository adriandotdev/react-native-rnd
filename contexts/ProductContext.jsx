import { createContext, useReducer } from "react";

export const ProductContext = createContext();

const initialState = {
	products: [],
};

const reducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "NEW_PRODUCT":
			return { ...state, products: payload.products };
	}
};

export const ProductProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<ProductContext.Provider value={{ state, dispatch }}>
			{children}
		</ProductContext.Provider>
	);
};
