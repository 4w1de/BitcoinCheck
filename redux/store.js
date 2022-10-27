import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import ChangeCurrencyReducer from './reducers/changeCurrencyReducer';

export const store = configureStore({
    reducer: ChangeCurrencyReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
