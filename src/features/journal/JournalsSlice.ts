import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IJournal } from "../../interfaces";
import { BASE_URL, JOURNALS } from "../../constants";

type FetchError = {
  message: string;
};

// Define a type for the slice state
interface JournalsState {
  status: "loading" | "idle";
  error: string | null;
  journals: IJournal[];
}

// Define the initial state using that type
const initialState: JournalsState = {
  status: "idle",
  error: null,
  journals: [],
};

export const journalsSlice = createSlice({
  name: "journals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJournals.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchJournals.fulfilled, (state, { payload }) => {
      state.journals = payload;
      state.status = "idle";
    });
    builder.addCase(fetchJournals.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export const fetchJournals = createAsyncThunk<
  IJournal[],
  void,
  { rejectValue: FetchError }
>("journals", async () => {
  const response = await fetch(`${BASE_URL}/${JOURNALS}`, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `guid=&title=`,
    method: "POST",
    mode: "cors",
    credentials: "omit",
  });
  const data = await response.json();
  return data;
});

export const selectStatus = (state: RootState) => state.journals.status;
export const selectError = (state: RootState) => state.journals.error;
export const selectJournals = (state: RootState) => state.journals.journals;

export default journalsSlice.reducer;
