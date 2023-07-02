import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface UiState {
	menuOpen: boolean;
	searchClicked: boolean;
}

// Define the initial state using that type
const initialState: UiState = {
	menuOpen: false,
	searchClicked: false,
};

export const uiSlice = createSlice({
	name: "ui",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setMenuOpen: (state, { payload }) => {
			state.menuOpen = payload;
		},
		setSearchClicked: (state, { payload }) => {
			state.searchClicked = payload;
		},
	},
});

export const { setSearchClicked, setMenuOpen } = uiSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMenuOpen = (state: RootState) => state.ui.menuOpen;
export const selectSearchClicked = (state: RootState) => state.ui.searchClicked;

export default uiSlice.reducer;
