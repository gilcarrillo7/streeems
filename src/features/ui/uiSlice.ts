import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface UiState {
	loginModal: boolean;
}

// Define the initial state using that type
const initialState: UiState = {
	loginModal: false,
};

export const uiSlice = createSlice({
	name: "ui",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		showLoginModal: (state) => {
			state.loginModal = true;
		},
		hideLoginModal: (state) => {
			state.loginModal = false;
		},
	},
});

export const { showLoginModal, hideLoginModal } = uiSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoginModal = (state: RootState) => state.ui.loginModal;

export default uiSlice.reducer;
