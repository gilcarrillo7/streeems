import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IInstitution } from "../../interfaces";
import { BASE_URL, INSTITUTIONS } from "../../constants";

type FetchError = {
	message: string;
};

// Define a type for the slice state
interface InstitutionState {
	status: "loading" | "idle";
	error: string | null;
	institutions: IInstitution[];
}

// Define the initial state using that type
const initialState: InstitutionState = {
	status: "idle",
	error: null,
	institutions: [],
};

export const institutionsSlice = createSlice({
	name: "institutions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchInstitutions.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(fetchInstitutions.fulfilled, (state, { payload }) => {
			state.institutions = payload;
			state.status = "idle";
		});
		builder.addCase(fetchInstitutions.rejected, (state, { payload }) => {
			if (payload) state.error = payload.message;
			state.status = "idle";
		});
	},
});

export const fetchInstitutions = createAsyncThunk<
	IInstitution[],
	void,
	{ rejectValue: FetchError }
>("institutions", async () => {
	const response = await fetch(`${BASE_URL}/${INSTITUTIONS}`);
	const data = await response.json();
	return data;
});

export const selectStatus = (state: RootState) => state.institutions.status;
export const selectError = (state: RootState) => state.institutions.error;
export const selectInstitutions = (state: RootState) =>
	state.institutions.institutions;
export const selectInstitutionsName = (state: RootState) =>
	state.institutions.institutions.map((institution) =>
		institution.name.toLowerCase()
	);

export default institutionsSlice.reducer;
