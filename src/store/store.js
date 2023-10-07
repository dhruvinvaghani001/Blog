import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import categoryReducer from './categorySlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        category: categoryReducer
    }
})

export default store;
