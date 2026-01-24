import { productsApi } from '@entities/product';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsControlReducer } from '@widgets/productsControls';

export const rootReducer = combineReducers({
    [productsApi.reducerPath]: productsApi.reducer,
    productsControlReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(productsApi.middleware),
    });
};
