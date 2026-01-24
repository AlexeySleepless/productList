import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface State {
    searchQuery: string;
}

const initialState: State = {
    searchQuery: '',
};

export const productsControlSlice = createSlice({
    name: 'productsControl',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload.trim();
        },
    },
});

export const productsControlReducer = productsControlSlice.reducer;
