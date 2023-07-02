import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IPublication, IPublicationResponse } from "../../interfaces";
import { BASE_URL, PUBLICATIONS } from "../../constants";
import { getDossierColor } from "../../utils";

type FetchError = {
	message: string;
};

type TypeFilter = {
	title: string;
	journals: string[];
	institutions: string[];
	types: string[];
	langs: string[];
	dateFrom: string | null;
	dateTo: string | null;
};

// Define a type for the slice state
interface PublicationsState {
	status: "loading" | "idle";
	error: string | null;
	publications: IPublication[];
	filterPublications: IPublication[];
	count: number;
	next: string | null;
	previous: string | null;
	pieChart: {
		dossiers: string[];
		percents: number[];
		colors: string[];
	};
	currentPage: number;
	filters: TypeFilter;
}

// Define the initial state using that type
const initialState: PublicationsState = {
	status: "idle",
	error: null,
	publications: [],
	filterPublications: [],
	count: 0,
	next: null,
	previous: null,
	pieChart: {
		dossiers: [],
		percents: [],
		colors: [],
	},
	currentPage: 1,
	filters: {
		title: "",
		journals: [],
		institutions: [],
		types: [],
		langs: [],
		dateFrom: "",
		dateTo: "",
	},
};

const applyFilters = (
	publications: IPublication[],
	filters: TypeFilter
): IPublication[] => {
	let filteredPubs = publications;
	const { title, journals, institutions, types, langs, dateFrom, dateTo } =
		filters;
	const searchTitle = title.toLowerCase();
	filteredPubs = publications.filter((pub) =>
		pub.title.toLowerCase().includes(searchTitle)
	);
	if (journals.length > 0) {
		filteredPubs = filteredPubs.filter((pub) =>
			journals.includes(pub.journal.toLowerCase())
		);
	}
	if (institutions.length > 0) {
		filteredPubs = filteredPubs.filter((pub) =>
			institutions.includes(pub.institution.name.toLowerCase())
		);
	}
	if (types.length > 0) {
		filteredPubs = filteredPubs.filter((pub) =>
			types.includes(pub.type.toLowerCase())
		);
	}
	if (langs.length > 0 && langs[0] !== "alle") {
		filteredPubs = filteredPubs.filter((pub) =>
			pub.institution.country
				? langs.includes(pub.institution.country.toLowerCase())
				: false
		);
	}
	if (dateFrom) {
		const from = new Date(Date.parse(dateFrom)).getTime();
		filteredPubs = filteredPubs.filter(
			(pub) => new Date(Date.parse(pub.date)).getTime() >= from
		);
	}
	if (dateTo) {
		const to = new Date(Date.parse(dateTo)).getTime();
		filteredPubs = filteredPubs.filter(
			(pub) => new Date(Date.parse(pub.date)).getTime() <= to
		);
	}
	return filteredPubs;
};

export const publicationsSlice = createSlice({
	name: "publications",
	initialState,
	reducers: {
		setCurrentPage: (state, { payload }) => {
			state.currentPage = payload;
		},
		setFilterTitle: (state, { payload }) => {
			state.filters.title = payload;
			const searchTitle = payload.toLowerCase();
			state.filterPublications = state.publications.filter((pub) =>
				pub.title.toLowerCase().includes(searchTitle)
			);
		},
		setFilters: (state, { payload }) => {
			state.filters = { ...state.filters, ...payload };
			state.filterPublications = applyFilters(
				state.publications,
				state.filters
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPublications.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(fetchPublications.fulfilled, (state, { payload }) => {
			if (payload.detail) state.error = payload.detail;
			else {
				state.publications = [];
				state.publications.push(...payload.results);
				state.filterPublications = applyFilters(
					state.publications,
					state.filters
				);
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

export const { setCurrentPage, setFilters } = publicationsSlice.actions;

export const selectStatus = (state: RootState) => state.publications.status;
export const selectCount = (state: RootState) => state.publications.count;
export const selectError = (state: RootState) => state.publications.error;
export const selectPublications = (state: RootState) =>
	state.publications.publications;
export const selectHomePublications = (state: RootState) =>
	state.auth.logged
		? state.publications.filterPublications
		: state.publications.publications.slice(0, 9);
export const selectPieChart = (state: RootState) => state.publications.pieChart;
export const selectCurrentPage = (state: RootState) =>
	state.publications.currentPage;
export const selectFilters = (state: RootState) => state.publications.filters;

export default publicationsSlice.reducer;
