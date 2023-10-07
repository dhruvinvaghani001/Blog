import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories:
        [
            
        ]
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        loadCategory: (state, action) => {
           
            state.categories = action.payload.category2;
        }
    }
})

export const { loadCategory } = categorySlice.actions;

export default categorySlice.reducer;