import moment from 'moment';

import { DAYS_OF_THE_WEEK, MONTHS, MONDAY } from '../constants/date';
import { TIME_PERIODS, PERIODS_OBJ } from '../constants/timePerionds';

const getHistoryTenMinutes = (data) => {
    return data.map((e) => {
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: Number(e.priceUsd),
            dateChange,
        };
    });
};
const getHistoryThirtyMinutes = (data) => {
    return data.map((e) => {
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: Number(e.priceUsd),
            dateChange,
        };
    });
};
const getHistoryOneHour = (data) => {
    return data.map((e) => {
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: Number(e.priceUsd),
            dateChange,
        };
    });
};
const getHistoryThreeHours = (data) => {
    return data.map((e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        let titleCurMonth = MONTHS.find(
            (month) => month.id == curMonth - 1,
        ).abb;
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: Number(e.priceUsd),
            dateChange: titleCurMonth + '-' + curDay + '\n ' + dateChange,
        };
    });
};
const getHistorySixHours = (data) => {
    return data.map((e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        let titleCurMonth = MONTHS.find(
            (month) => month.id == curMonth - 1,
        ).abb;
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: Number(e.priceUsd),
            dateChange: titleCurMonth + '-' + curDay + '\n ' + dateChange,
        };
    });
};
const getHistoryTwelveHours = (data) => {
    return data.map((e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        let titleCurMonth = MONTHS.find(
            (month) => month.id == curMonth - 1,
        ).abb;
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: Number(e.priceUsd),
            dateChange: titleCurMonth + '-' + curDay + '\n ' + dateChange,
        };
    });
};

const getHistoryOneDay = (data) => {
    return data.map((e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        let titleCurMonth = MONTHS.find(
            (month) => month.id == curMonth - 1,
        ).abb;
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: Number(e.priceUsd),
            dateChange: titleCurMonth + '-' + curDay + '\n ' + dateChange,
        };
    });
};
const getHistorySevenDays = (data) => {
    return data.map((e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        let titleCurMonth = MONTHS.find(
            (month) => month.id == curMonth - 1,
        ).abb;
        let dateChange = moment(e.time).format('hh:mm');
        return {
            priceUsd: Number(e.priceUsd),
            dateChange: titleCurMonth + '-' + curDay + '\n ' + dateChange,
        };
    });
};
const getHistoryOneMonth = (data) => {
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
                priceUsd: Number(e.priceUsd),
                dateChange: titleCurMonth + '-' + curDay + '\n ' + dateChange,
            });
        }
        return res;
    }, []);
};
const getHistoryThreeMonths = (data) => {
    return data.reduce((res, e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        if (curDay == '01' || curDay == '15') {
            let titleCurMonth = MONTHS.find(
                (month) => month.id == curMonth - 1,
            ).abb;
            let dateChange = moment(e.time).format('hh:mm');
            res.push({
                priceUsd: Number(e.priceUsd),
                dateChange: titleCurMonth + '-' + curDay,
            });
        }

        return res;
    }, []);
};
const getHistorySixMonths = (data) => {
    return data.reduce((res, e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        if (curDay == '01') {
            let titleCurMonth = MONTHS.find(
                (month) => month.id == curMonth - 1,
            ).abb;
            let dateChange = moment(e.time).format('hh:mm');
            res.push({
                priceUsd: Number(e.priceUsd),
                dateChange: titleCurMonth + '-' + curDay,
            });
        }

        return res;
    }, []);
};
const getHistoryOneYear = (data) => {
    return data.reduce((res, e) => {
        let curMonth = moment(e.time).format('M');
        let curDay = moment(e.time).format('DD');
        if (curDay == '01') {
            let titleCurMonth = MONTHS.find(
                (month) => month.id == curMonth - 1,
            ).abb;
            let dateChange = moment(e.time).format('hh:mm');
            res.push({
                priceUsd: Number(e.priceUsd),
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
