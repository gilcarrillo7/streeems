import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IPublication, IPublicationResponse } from "../../interfaces";
import { BASE_URL, PUBLICATIONS } from "../../constants";
import { getDossierColor } from "../../utils";

type FetchError = {
	message: string;
};

// Define a type for the slice state
interface PublicationsState {
	status: "loading" | "idle";
	error: string | null;
	publications: IPublication[];
	count: number;
	next: string | null;
	previous: string | null;
	pieChart: {
		dossiers: string[];
		percents: number[];
		colors: string[];
	};
}

// Define the initial state using that type
const initialState: PublicationsState = {
	status: "idle",
	error: null,
	publications: [],
	count: 0,
	next: null,
	previous: null,
	pieChart: {
		dossiers: [],
		percents: [],
		colors: [],
	},
};

export const publicationsSlice = createSlice({
	name: "publications",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPublications.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(fetchPublications.fulfilled, (state, { payload }) => {
			if (payload.detail) state.error = payload.detail;
			else {
				state.publications.push(...payload.results);
				state.count = payload.count;
				state.next = payload.next ? payload.next.split("=")[1] : "";
				state.previous = payload.previous;
				const dossiers = state.publications.map((pub) => pub.dossier);
				const dossiersUnique = [...new Set(dossiers)];
				const percents = dossiersUnique.map((dossier) =>
					Math.round(
						(state.publications.filter((pub) => pub.dossier === dossier)
							.length *
							100) /
							state.publications.length
					)
				);
				const colors = dossiersUnique.map((dossier) =>
					getDossierColor(dossier)
				);
				state.pieChart = { dossiers: dossiersUnique, percents, colors };
			}
			state.status = "idle";
		});
		builder.addCase(fetchPublications.rejected, (state, { payload }) => {
			if (payload) state.error = payload.message;
			state.status = "idle";
		});
	},
});

export const fetchPublications = createAsyncThunk<
	IPublicationResponse,
	number,
	{ rejectValue: FetchError }
>("publications", async (page: number) => {
	const response = await fetch(`${BASE_URL}/${PUBLICATIONS}/?page=${page}`);
	const data = await response.json();
	return data;
});

export const selectStatus = (state: RootState) => state.publications.status;
export const selectCount = (state: RootState) => state.publications.count;
export const selectError = (state: RootState) => state.publications.error;
export const selectPublications = (state: RootState) =>
	state.publications.publications;
export const selectHomePublications = (state: RootState) =>
	state.publications.publications.slice(0, 9);
export const selectPieChart = (state: RootState) => state.publications.pieChart;

export default publicationsSlice.reducer;
