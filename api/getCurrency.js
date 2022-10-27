import axios from 'axios';

import { getUrlRates } from '../api/getUrlCoin';

export const getCurrency = (idCurrency = 'united-states-dollar') => {
    return async function getCurrencyThunk(dispatch, getState) {
        const initialTodo = { idCurrency };
        const data = await axios
            .get(getUrlRates(idCurrency))
            .then(({ data }) => {
                return {
                    value: data.data.id,
                    rateUsd: data.data.rateUsd,
                    currencySymbol: data.data.currencySymbol,
                    symbol: data.data.symbol,
                };
            });
        dispatch({ type: 'CHANGE_CURRENCY', payload: data });
    };
};
