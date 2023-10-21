import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import {
  IFavPublicationResponse,
  IFavouritePayload,
  IPublication,
  IPublicationPayload,
  IPublicationResponse,
} from "../../interfaces";
import {
  AUTH,
  BASE_URL,
  FAVOURITE,
  PUBLICATIONS,
  USERS,
} from "../../constants";
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
  status: "loading" | "idle" | "success";
  error: string | null;
  publications: IPublication[];
  filterPublications: IPublication[];
  favourites: string[];
  favPublications: IPublication[];
  favFilterPublications: IPublication[];
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
  favFilters: TypeFilter;
}

// Define the initial state using that type
const initialState: PublicationsState = {
  status: "idle",
  error: null,
  publications: [],
  filterPublications: [],
  favourites: [],
  favPublications: [],
  favFilterPublications: [],
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
  favFilters: {
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
      (pub) => new Date(pub.date).getTime() >= from
    );
  }
  if (dateTo) {
    const to = new Date(Date.parse(dateTo)).getTime();
    filteredPubs = filteredPubs.filter(
      (pub) => new Date(pub.date).getTime() <= to
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
    setFavFilters: (state, { payload }) => {
      state.favFilters = { ...state.favFilters, ...payload };
      state.favFilterPublications = applyFilters(
        state.favPublications,
        state.favFilters
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
        state.publications.push(
          ...payload.results.map((pub) => ({ ...pub, favourite: false }))
        );
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
    builder.addCase(fetchFavouriteList.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchFavouriteList.fulfilled, (state, { payload }) => {
      if (payload.detail) state.error = payload.detail;
      else {
        state.favPublications = [];
        state.favPublications.push(
          ...payload.results.map((res) => ({
            ...res.publication,
            favourite: false,
          }))
        );
        state.favFilterPublications = applyFilters(
          state.favPublications,
          state.favFilters
        );
        state.count = payload.count;
        state.next = payload.next ? payload.next.split("=")[1] : "";
        state.previous = payload.previous;
      }
      state.status = "idle";
    });
    builder.addCase(fetchFavouriteList.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
    builder.addCase(fetchFavPublications.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchFavPublications.fulfilled, (state, { payload }) => {
      // state.favourites = state.publications.filter((pub) =>
      // 	payload.includes(pub.id)
      // );
      if (Array.isArray(payload)) state.favourites = payload;
      else state.favourites = [];
      state.status = "idle";
    });
    builder.addCase(fetchFavPublications.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
    builder.addCase(postFavourite.pending, (state) => {
      state.error = null;
    });
    builder.addCase(postFavourite.fulfilled, (state, { payload }) => {
      state.favourites.push(payload.publication);
    });
    builder.addCase(postFavourite.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
    });
    builder.addCase(deleteFavourite.pending, (state) => {
      state.error = null;
    });
    builder.addCase(deleteFavourite.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });
    builder.addCase(deleteFavourite.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
    });
    builder.addCase(postPublication.pending, (state) => {
      state.error = null;
      state.status = "loading";
    });
    builder.addCase(postPublication.fulfilled, (state, { payload }) => {
      state.status = "idle";
      if (payload.url)
        state.error =
          typeof payload.url === "string" ? payload.url : payload.url.join(" ");
      else if (payload.date)
        state.error =
          typeof payload.date === "string"
            ? payload.date
            : payload.date.join(" ");
      else if (payload.institution)
        state.error =
          typeof payload.institution === "string"
            ? payload.institution
            : payload.institution.join(" ");
      else if (payload.journal)
        state.error =
          typeof payload.journal === "string"
            ? payload.journal
            : payload.journal.join(" ");
      else if (payload.title)
        state.error =
          typeof payload.title === "string"
            ? payload.title
            : payload.title.join(" ");
      else if (payload.header_image)
        state.error =
          typeof payload.header_image === "string"
            ? payload.header_image
            : payload.header_image.join(" ");
      else state.status = "success";
    });
    builder.addCase(postPublication.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.error = "An error ocurred.";
      state.status = "idle";
    });
  },
});

export const fetchPublications = createAsyncThunk<
  IPublicationResponse,
  { page: number; numInPage?: number },
  { rejectValue: FetchError }
>("publications", async ({ page, numInPage = 16 }) => {
  const response = await fetch(`${BASE_URL}/${PUBLICATIONS}`, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `guid=&numInPage=${numInPage}&currentPage=${page}&title=&status=&sortColumn=date&sortDir=`,
    method: "POST",
    mode: "cors",
    credentials: "omit",
  });
  const data = await response.json();
  return data;
});

export const postFavourite = createAsyncThunk<
  IFavouritePayload,
  { publication: string; token: string },
  { rejectValue: FetchError }
>("postFavourite", async ({ publication, token }) => {
  const response = await fetch(`${BASE_URL}/${FAVOURITE}/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      publication,
    }),
  });
  const data = await response.json();
  return data;
});

export const deleteFavourite = createAsyncThunk<
  void,
  { publication: string; token: string },
  { rejectValue: FetchError }
>("deleteFavourite", async ({ publication, token }) => {
  const response = await fetch(`${BASE_URL}/${FAVOURITE}/${publication}/`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

export const fetchFavPublications = createAsyncThunk<
  string[] | { detail: string },
  string,
  { rejectValue: FetchError }
>("fetchFavPublications", async (token) => {
  const response = await fetch(`${BASE_URL}/${AUTH}/${USERS}/${FAVOURITE}/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

export const fetchFavouriteList = createAsyncThunk<
  IFavPublicationResponse,
  { token: string; page: number },
  { rejectValue: FetchError }
>("fetchFavouriteList", async ({ token, page }) => {
  const response = await fetch(`${BASE_URL}/${FAVOURITE}/?page=${page}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

export const postPublication = createAsyncThunk<
  IPublicationPayload,
  { payload: IPublicationPayload; token: string },
  { rejectValue: FetchError }
>("postPublication", async ({ payload, token }) => {
  const response = await fetch(`${BASE_URL}/${PUBLICATIONS}/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      ...payload,
    }),
  });
  const data = await response.json();
  return data;
});

export const { setCurrentPage, setFilters, setFavFilters } =
  publicationsSlice.actions;

export const selectStatus = (state: RootState) => state.publications.status;
export const selectCount = (state: RootState) => state.publications.count;
export const selectError = (state: RootState) => state.publications.error;
export const selectPublications = (state: RootState) =>
  state.publications.publications;
export const selectHomePublications = (state: RootState) =>
  state.auth.logged
    ? state.publications.filterPublications
    : state.publications.publications.slice(0, 9);
export const selectFavFilterPublications = (state: RootState) =>
  state.publications.favFilterPublications;
export const selectPieChart = (state: RootState) => state.publications.pieChart;
export const selectCurrentPage = (state: RootState) =>
  state.publications.currentPage;
export const selectFilters = (state: RootState) => state.publications.filters;
export const selectFavFilters = (state: RootState) =>
  state.publications.favFilters;
export const selectFavourites = (state: RootState) =>
  state.publications.favourites;
export const selectPubFavourites = (state: RootState) =>
  state.publications.publications.filter((pub) =>
    state.publications.favourites.includes(pub.guid)
  );

export default publicationsSlice.reducer;
