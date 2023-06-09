import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IDossier } from "../../interfaces";
import { BASE_URL, DOSSIERS } from "../../constants";

type FetchError = {
	message: string;
};

// Define a type for the slice state
interface DossierState {
	status: "loading" | "idle";
	error: string | null;
	dossiers: IDossier[];
}

// Define the initial state using that type
const initialState: DossierState = {
	status: "idle",
	error: null,
	dossiers: [],
};

export const dossiersSlice = createSlice({
	name: "dossiers",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchDossiers.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(fetchDossiers.fulfilled, (state, { payload }) => {
			state.dossiers = payload;
			state.status = "idle";
		});
		builder.addCase(fetchDossiers.rejected, (state, { payload }) => {
			if (payload) state.error = payload.message;
			state.status = "idle";
		});
	},
});

export const fetchDossiers = createAsyncThunk<
	IDossier[],
	void,
	{ rejectValue: FetchError }
>("dossiers", async () => {
	const response = await fetch(`${BASE_URL}/${DOSSIERS}`, {
		referrerPolicy: "strict-origin-when-cross-origin",
		body: null,
		method: "GET",
		mode: "cors",
		credentials: "omit",
	});
	const data = await response.json();
	return data;
});

export const selectStatus = (state: RootState) => state.dossiers.status;
export const selectError = (state: RootState) => state.dossiers.error;
export const selectDossiers = (state: RootState) => state.dossiers.dossiers;
export const selectWidth = (state: RootState) =>
	Math.floor(100 / state.dossiers.dossiers.length);

export default dossiersSlice.reducer;
