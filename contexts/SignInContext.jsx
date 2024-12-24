import * as React from "react";

export const SignInContext = React.createContext();

const initialState = {
	user: null,
	isAuthenticated: null,
};

const reducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "LOGIN":
			return { ...state, user: payload.user, isAuthenticated: true };
		case "LOGOUT":
			return { ...state, user: null, isAuthenticated: false };
	}
};

export const SignInProvider = ({ children }) => {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	return (
		<SignInContext.Provider value={{ state, dispatch }}>
			{children}
		</SignInContext.Provider>
	);
};
