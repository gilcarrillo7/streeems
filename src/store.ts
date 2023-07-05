import {
	configureStore,
	combineReducers,
	Action,
	CombinedState,
	Middleware,
} from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import uiReducer from "./features/ui/uiSlice";
import authReducer, { AuthState } from "./features/auth/AuthSlice";
import publicationsReducer from "./features/publications/publicationsSlice";
import dossiersReducer from "./features/dossiers/DossiersSlice";
import institutionssReducer from "./features/institutions/InstitutionsSlice";
import { navigate } from "gatsby";

const rootReducer = combineReducers({
	ui: uiReducer,
	auth: authReducer,
	publications: publicationsReducer,
	dossiers: dossiersReducer,
	institutions: institutionssReducer,
});
const middleware: Middleware<void, CombinedState<{ auth: AuthState }>> =
	({ getState, dispatch }) =>
	(next) =>
	(action) => {
		const result = next(action);
		if (
			action.type === "doLogin/fulfilled" ||
			action.type === "doActivation/fulfilled"
		) {
			const token = getState().auth.token;
			if (token !== "") {
				localStorage.setItem("token", getState().auth.token);
			} else localStorage.removeItem("token");
		}
		if (
			action.type === "doLogout/fulfilled" ||
			action.type === "doLogout/rejected"
		) {
			localStorage.removeItem("token");
			dispatch({ type: "ui/setMenuOpen", payload: false }), navigate("/");
		}
		return result;
	};

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			middleware as unknown as ReturnType<typeof getDefaultMiddleware>
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Thunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
