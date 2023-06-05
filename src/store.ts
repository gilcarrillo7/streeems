import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import uiReducer from "./features/ui/uiSlice";
import publicationsReducer from "./features/publications/publicationsSlice";
import dossiersReducer from "./features/dossiers/DossiersSlice";

const rootReducer = combineReducers({
	ui: uiReducer,
	publications: publicationsReducer,
	dossiers: dossiersReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Thunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
