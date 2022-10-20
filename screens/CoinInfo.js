import { View, Alert, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';

import { LogBox } from 'react-native';

import { Refresh } from '../components/Refresh';
import { Loader } from '../components/Loader';
import { HeaderText } from '../components/HeaderText';
import { InfoTextCenter } from '../components/InfoTextCenter';
import { ChartCoin } from '../components/ChartCoin';
import { TableMarkets } from '../components/TableMarkets';

import { TIME_PERIODS, PERIODS_OBJ } from '../constants/timePerionds';
import { Details } from '../components/Details';
import { getHistoryCoin } from '../api/getHistoryCoin';
import { getUrlCoin, getUrlHistory, getUrlMarkets } from '../api/getUrlCoin';
import { HEADER_MARKETS_TABLE } from '../constants/headerMarketsTable';
import { fixedNumber, pointsInNumber } from '../api/transformNumber';

const CoinSafeAreaView = styled.SafeAreaView`
    padding: 0 15px;
`;
const CoinScrollView = styled.ScrollView``;

export const CoinInfo = ({ route, navigation }) => {
    const { idCoin = 'bitcoin', title = 'Bitcoin' } = route.params;
    navigation.setOptions({
        title,
    });

    const [isLoading, setIsLoading] = React.useState(true);
    const [coin, setCoin] = React.useState({});
    const [historyCoin, setHistoryCoin] = React.useState([]);
    const [markets, setMarkets] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const [timePeriod, setTimePeriod] = React.useState(null);
    const [items, setItems] = React.useState(TIME_PERIODS);

    const fetchCoin = () => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        setTimePeriod(PERIODS_OBJ.TEN_MINUTES.value);
        setIsLoading(true);
        axios
            .get(getUrlCoin(idCoin))
            .then(({ data }) => {
                setCoin(data.data);
            })
            .catch(() => Alert.alert('Error', 'Failed to load!'));
        axios
            .get(getUrlMarkets(idCoin))
            .then(({ data }) => {
                const arrMarkets = data.data.map((e) => {
                    return [
                        e.exchangeId,
                        '$' + pointsInNumber(e.priceUsd, 3),
                        pointsInNumber(e.volumePercent, 5) + '%',
                    ];
                });
                setMarkets(arrMarkets);
            })
            .catch(() => Alert.alert('Error', 'Failed to load!'))
            .finally(() => {
                setIsLoading(false);
            });
    };

    const changeTimePeriod = () => {
        switch (timePeriod) {
            case PERIODS_OBJ.TEN_MINUTES.value: {
                let currentTime = Date.now();
                let previousTime = currentTime - 720000;
                axios
                    .get(getUrlHistory(idCoin, 'm1', previousTime, currentTime))
                    .then(({ data }) => {
                        const arrHistoryCoin =
                            getHistoryCoin.getHistoryTenMinutes(data.data);
                        setHistoryCoin(arrHistoryCoin);
                    })
                    .catch(() => Alert.alert('Error', 'Failed to load!'));
                break;
            }
            case PERIODS_OBJ.THIRTY_MINUTES.value: {
                let currentTime = Date.now();
                let previousTime = currentTime - 2100000;
                axios
                    .get(getUrlHistory(idCoin, 'm5', previousTime, currentTime))
                    .then(({ data }) => {
                        const arrHistoryCoin =
                            getHistoryCoin.getHistoryThirtyMinutes(data.data);
                        setHistoryCoin(arrHistoryCoin);
                    })
                    .catch(() => Alert.alert('Error', 'Failed to load!'));
                break;
            }
            case PERIODS_OBJ.ONE_HOUR.value: {
                let currentTime = Date.now();
                let previousTime = currentTime - 4500000;
                axios
                    .get(
                        getUrlHistory(idCoin, 'm15', previousTime, currentTime),
                    )
                    .then(({ data }) => {
                        const arrHistoryCoin = getHistoryCoin.getHistoryOneHour(
                            data.data,
                        );
                        setHistoryCoin(arrHistoryCoin);
                    })
                    .catch(() => Alert.alert('Error', 'Failed to load!'));
                break;
            }
            case PERIODS_OBJ.THREE_HOURS.value: {
                let currentTime = Date.now();
                let previousTime = currentTime - 12600000;
                axios
                    .get(
                        getUrlHistory(idCoin, 'm30', previousTime, currentTime),
                    )
                    .then(({ data }) => {
                        const arrHistoryCoin =
                            getHistoryCoin.getHistoryThreeHours(data.data);
                        setHistoryCoin(arrHistoryCoin);
                    })
                    .catch(() => Alert.alert('Error', 'Failed to load!'));
                break;
            }
            case PERIODS_OBJ.SIX_HOURS.value: {
                let currentTime = Date.now();
                let previousTime = currentTime - 25200000;
                axios
                    .get(getUrlHistory(idCoin, 'h1', previousTime, currentTime))
                    .then(({ data }) => {
                        const arrHistoryCoin =
                            getHistoryCoin.getHistorySixHours(data.data);
                        setHistoryCoin(arrHistoryCoin);
                    })
                    .catch(() => Alert.alert('Error', 'Failed to load!'));
                break;
            }
            case PERIODS_OBJ.TWELVE_HOURS.value: {
                let currentTime = Date.now();
                let previousTime = currentTime - 50400000;
                axios
                    .get(getUrlHistory(idCoin, 'h2', previousTime, currentTime))
                    .then(({ data }) => {
                        const arrHistoryCoin =
                            getHistoryCoin.getHistoryTwelveHours(data.data);
                        setHistoryCoin(arrHistoryCoin);
                    })
                    .catch(() => Alert.alert('Error', 'Failed to load!'));
                break;
            }
            case PERIODS_OBJ.ONE_DAY.value: {
                let currentTime = Date.now();
                let previousTime = currentTime - 111600000;
                axios
                    .get(getUrlHistory(idCoin, 'h6', previousTime, currentTime))
                    .then(({ data }) => {
                        const arrHistoryCoin = getHistoryCoin.getHistoryOneDay(
                            data.data,
                        );
                        setHistoryCoin(arrHistoryCoin);
                    })
                    .catch(() => Alert.alert('Error', 'Failed to load!'));
                break;
            }
            case PERIODS_OBJ.SEVEN_DAYS.value: {
                let currentTime = Date.now();
                let previousTime = currentTime - 691200000;
                axios
                    .get(getUrlHistory(idCoin, 'd1', previousTime, currentTime))
                    .then(({ data }) => {
                        const arrHistoryCoin =
                            getHistoryCoin.getHistorySevenDays(data.data);
                        setHistoryCoin(arrHistoryCoin);
                    })
                    .catch(() => Alert.alert('Error', 'Failed to load!'));
                break;
            }
            case PERIODS_OBJ.ONE_MONTH.value: {
                let currentTime = Date.now();
                let previousTime = currentTime - 2764800000;
                axios
                    .get(getUrlHistory(idCoin, 'd1', previousTime, currentTime))
                    .then(({ data }) => {
                        const arrHistoryCoin =
                            getHistoryCoin.getHistoryOneMonth(data.data);
                        setHistoryCoin(arrHistoryCoin);
                    })
                    .catch(() => Alert.alert('Error', 'Failed to load!'));
                break;
            }
            case PERIODS_OBJ.THREE_MONTHS.value: {
                let currentTime = Date.now();
                let previousTime = currentTime - 8121600000;
                axios
                    .get(getUrlHistory(idCoin, 'd1', previousTime, currentTime))
                    .then(({ data }) => {
                        const arrHistoryCoin =
                            getHistoryCoin.getHistoryThreeMonths(data.data);
                        setHistoryCoin(arrHistoryCoin);
                    })
                    .catch(() => Alert.alert('Error', 'Failed to load!'));
                break;
            }
            case PERIODS_OBJ.SIX_MONTHS.value: {
                let currentTime = Date.now();
                let previousTime = currentTime - 16156800000;
                axios
                    .get(getUrlHistory(idCoin, 'd1', previousTime, currentTime))
                    .then(({ data }) => {
                        const arrHistoryCoin =
                            getHistoryCoin.getHistorySixMonths(data.data);
                        setHistoryCoin(arrHistoryCoin);
                    })
                    .catch(() => Alert.alert('Error', 'Failed to load!'));
                break;
            }
            case PERIODS_OBJ.ONE_YEAR.value: {
                let currentTime = Date.now();
                let previousTime = currentTime - 32227200000;
                axios
                    .get(getUrlHistory(idCoin, 'd1', previousTime, currentTime))
                    .then(({ data }) => {
                        const arrHistoryCoin = getHistoryCoin.getHistoryOneYear(
                            data.data,
                        );
                        setHistoryCoin(arrHistoryCoin);
                    })
                    .catch(() => Alert.alert('Error', 'Failed to load!'));
                break;
            }
        }
    };

    React.useEffect(fetchCoin, []);
    React.useEffect(changeTimePeriod, [timePeriod]);

    return (
        <View style={{ backgroundColor: '#333333', height: '100%' }}>
            <Refresh fetchCoins={fetchCoin} />
            {isLoading ? (
                <Loader />
            ) : (
                <ScrollView nestedScrollEnabled={true}>
                    <CoinSafeAreaView>
                        <CoinScrollView>
                            <Details coin={coin} />
                        </CoinScrollView>
                        <InfoTextCenter text="Chart" />
                        <DropDownPicker
                            open={open}
                            value={timePeriod}
                            items={items}
                            setOpen={setOpen}
                            setValue={setTimePeriod}
                            setItems={setItems}
                            theme="DARK"
                            placeholder={'Select time period'}
                            dropDownDirection="AUTO"
                            bottomOffset={100}
                            selectedItemContainerStyle={{
                                backgroundColor: 'grey',
                            }}
                            listMode="MODAL"
                            modalTitle="Select time period"
                            modalContentContainerStyle={{
                                backgroundColor: '#333333',
                            }}
                            style={{
                                backgroundColor: '#333333',
                                borderRadius: 0,
                                borderColor: '#555555',
                            }}
                        />
                        <ChartCoin historyCoin={historyCoin} />
                        <TableMarkets markets={markets} />
                    </CoinSafeAreaView>
                </ScrollView>
            )}
        </View>
    );
};
