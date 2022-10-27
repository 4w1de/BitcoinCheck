import { COINCAP, RATES } from '../constants/urls';

export const getUrlHistory = (coin, timePeriod, start, end) =>
    `${COINCAP}/${coin}/history?interval=${timePeriod}&start=${start}&end=${end}`;
export const getUrlCoin = (coin) => `${COINCAP}/${coin}`;
export const getUrlMarkets = (coin) => `${COINCAP}/${coin}/markets`;
export const getUrlRates = (currency) => `${RATES}/${currency}`;
