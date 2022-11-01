import { SORT_OBJ } from '../constants/sort';

export const sorting = (coins, sortValue) => {
    switch (sortValue) {
        case SORT_OBJ.RECOMMENDED.value: {
            coins.sort((a, b) =>
                Number(a.changePercent24Hr) < Number(b.changePercent24Hr)
                    ? 1
                    : -1,
            );
            return coins;
        }
        case SORT_OBJ.TITLE_LOW_TO_HIGH.value: {
            coins.sort((a, b) => (a.name > b.name ? 1 : -1));
            return coins;
        }
        case SORT_OBJ.TITLE_HIGH_TO_LOW.value: {
            coins.sort((a, b) => (a.name < b.name ? 1 : -1));
            return coins;
        }
        case SORT_OBJ.PRICE_LOW_TO_HIGH.value: {
            coins.sort((a, b) =>
                Number(a.priceUsd) > Number(b.priceUsd) ? 1 : -1,
            );
            return coins;
        }
        case SORT_OBJ.PRICE_HIGH_TO_LOW.value: {
            coins.sort((a, b) =>
                Number(a.priceUsd) < Number(b.priceUsd) ? 1 : -1,
            );
            return coins;
        }
        case SORT_OBJ.POPULARITY.value: {
            coins.sort((a, b) => (Number(a.rank) > Number(b.rank) ? 1 : -1));
            return coins;
        }
        default: {
            coins.sort((a, b) => (a.rank > b.rank ? 1 : -1));
            return coins;
        }
    }
};

export const sortingCurrency = (currency) => {
    currency.sort((a, b) => (a.label > b.label ? 1 : -1));
    return currency;
};
