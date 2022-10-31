import moment from 'moment';

import { DAYS_OF_THE_WEEK, MONTHS, MONDAY } from '../constants/date';
import { TIME_PERIODS, PERIODS_OBJ } from '../constants/timePerionds';
import { currencyConverter } from '../api/currencyConverter';

const getHistoryTenMinutes = (data, rateUsd) => {
    return data.map((e) => {
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: currencyConverter(e.priceUsd, rateUsd),
            dateChange,
        };
    });
};
const getHistoryThirtyMinutes = (data, rateUsd) => {
    return data.map((e) => {
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: currencyConverter(e.priceUsd, rateUsd),
            dateChange,
        };
    });
};
const getHistoryOneHour = (data, rateUsd) => {
    return data.map((e) => {
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: currencyConverter(e.priceUsd, rateUsd),
            dateChange,
        };
    });
};
const getHistoryThreeHours = (data, rateUsd) => {
    return data.map((e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        let titleCurMonth = MONTHS.find(
            (month) => month.id == curMonth - 1,
        ).abb;
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: currencyConverter(e.priceUsd, rateUsd),
            dateChange: titleCurMonth + '-' + curDay + '\n ' + dateChange,
        };
    });
};
const getHistorySixHours = (data, rateUsd) => {
    return data.map((e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        let titleCurMonth = MONTHS.find(
            (month) => month.id == curMonth - 1,
        ).abb;
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: currencyConverter(e.priceUsd, rateUsd),
            dateChange: titleCurMonth + '-' + curDay + '\n ' + dateChange,
        };
    });
};
const getHistoryTwelveHours = (data, rateUsd) => {
    return data.map((e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        let titleCurMonth = MONTHS.find(
            (month) => month.id == curMonth - 1,
        ).abb;
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: currencyConverter(e.priceUsd, rateUsd),
            dateChange: titleCurMonth + '-' + curDay + '\n ' + dateChange,
        };
    });
};

const getHistoryOneDay = (data, rateUsd) => {
    return data.map((e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        let titleCurMonth = MONTHS.find(
            (month) => month.id == curMonth - 1,
        ).abb;
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: currencyConverter(e.priceUsd, rateUsd),
            dateChange: titleCurMonth + '-' + curDay + '\n ' + dateChange,
        };
    });
};
const getHistorySevenDays = (data, rateUsd) => {
    return data.map((e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        let titleCurMonth = MONTHS.find(
            (month) => month.id == curMonth - 1,
        ).abb;
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: currencyConverter(e.priceUsd, rateUsd),
            dateChange: titleCurMonth + '-' + curDay + '\n ' + dateChange,
        };
    });
};
const getHistoryOneMonth = (data, rateUsd) => {
    return data.reduce((res, e) => {
        let dayOfWeekTMP = new Date(moment(e.time)).getDay();
        let dayOfWeek = DAYS_OF_THE_WEEK.find(
            (day) => day.id == dayOfWeekTMP,
        ).abb;

        if (MONDAY.abb === dayOfWeek) {
            let curMonth = moment(e.time).format('M');
            let curDay = moment(e.time).format('DD');
            let titleCurMonth = MONTHS.find(
                (month) => month.id == curMonth - 1,
            ).abb;
            let dateChange = moment(e.time).format('hh:mm');
            res.push({
                priceUsd: currencyConverter(e.priceUsd, rateUsd),
                dateChange: titleCurMonth + '-' + curDay + '\n ' + dateChange,
            });
        }
        return res;
    }, []);
};
const getHistoryThreeMonths = (data, rateUsd) => {
    return data.reduce((res, e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        if (curDay == '01' || curDay == '15') {
            let titleCurMonth = MONTHS.find(
                (month) => month.id == curMonth - 1,
            ).abb;
            let dateChange = moment(e.time).format('hh:mm');
            res.push({
                priceUsd: currencyConverter(e.priceUsd, rateUsd),
                dateChange: titleCurMonth + '-' + curDay,
            });
        }

        return res;
    }, []);
};
const getHistorySixMonths = (data, rateUsd) => {
    return data.reduce((res, e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        if (curDay == '01') {
            let titleCurMonth = MONTHS.find(
                (month) => month.id == curMonth - 1,
            ).abb;
            let dateChange = moment(e.time).format('hh:mm');
            res.push({
                priceUsd: currencyConverter(e.priceUsd, rateUsd),
                dateChange: titleCurMonth + '-' + curDay,
            });
        }

        return res;
    }, []);
};
const getHistoryOneYear = (data, rateUsd) => {
    return data.reduce((res, e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        if (curDay == '01') {
            let titleCurMonth = MONTHS.find(
                (month) => month.id == curMonth - 1,
            ).abb;
            let dateChange = moment(e.time).format('hh:mm');
            res.push({
                priceUsd: currencyConverter(e.priceUsd, rateUsd),
                dateChange: titleCurMonth + '-' + curDay,
            });
        }

        return res;
    }, []);
};

export const getHistoryCoin = {
    getHistoryTenMinutes,
    getHistoryThirtyMinutes,
    getHistoryOneHour,
    getHistoryThreeHours,
    getHistorySixHours,
    getHistoryTwelveHours,
    getHistoryOneDay,
    getHistorySevenDays,
    getHistoryOneMonth,
    getHistoryThreeMonths,
    getHistorySixMonths,
    getHistoryOneYear,
};
