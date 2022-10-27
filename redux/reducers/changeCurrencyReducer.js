const initialState = {
    currency: {
        value: 'united-states-dollar',
        rateUsd: '1.0000000000000000',
        currencySymbol: '$',
        symbol: 'USD',
    },
};

export default ChangeCurrencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENCY':
            return {
                ...state,
                currency: action.payload,
            };
        default:
            return state;
    }
};
