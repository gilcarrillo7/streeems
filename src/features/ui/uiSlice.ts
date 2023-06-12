import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface UiState {
	loginModal: boolean;
	logged: boolean;
	menuOpen: boolean;
	searchClicked: boolean;
}

// Define the initial state using that type
const initialState: UiState = {
	loginModal: false,
	logged: false,
	menuOpen: false,
	searchClicked: false,
};

export const uiSlice = createSlice({
	name: "ui",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setLoginModal: (state, { payload }) => {
			state.loginModal = payload;
		},
		setMenuOpen: (state, { payload }) => {
			state.menuOpen = payload;
		},
		setSearchClicked: (state, { payload }) => {
			state.searchClicked = payload;
		},
		setLogged: (state, { payload }) => {
			state.logged = payload;
			state.loginModal = false;
		},
	},
});

export const { setLoginModal, setSearchClicked, setMenuOpen, setLogged } =
	uiSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLogged = (state: RootState) => state.ui.logged;
export const selectLoginModal = (state: RootState) => state.ui.loginModal;
export const selectMenuOpen = (state: RootState) => state.ui.menuOpen;
export const selectSearchClicked = (state: RootState) => state.ui.searchClicked;

export default uiSlice.reducer;
