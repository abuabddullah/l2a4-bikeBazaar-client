// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./slices/cartSlice";
// import authReducer from "./slices/authSlice";
// import { api } from "./api";

// export const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//     cart: cartReducer,
//     auth: authReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

/* new code */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import { api } from "./api";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"], // Only persist cart and auth
};

// Combine reducers
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  cart: cartReducer,
  auth: authReducer,
});

// Apply persistReducer to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Redux Persist requires this to be disabled
    }).concat(api.middleware),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
