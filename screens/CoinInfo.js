import { StatusBar } from 'expo-status-bar';
import {
    Text,
    View,
    Alert,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import * as NavigationBar from 'expo-navigation-bar';
import styled from 'styled-components';
import {
    VictoryLine,
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryLabel,
    VictoryAxis,
    VictoryScatter,
    VictoryTooltip,
    VictoryVoronoiContainer,
} from 'victory-native';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';

import { Refresh } from '../components/Refresh';
import { Crypto } from '../components/Crypto';
import { Loader } from '../components/Loader';
import { HeaderText } from '../components/HeaderText';

import { DAYS_OF_THE_WEEK } from '../constants/date';
import { TIME_PERIODS, PERIODS_OBJ } from '../constants/timePerionds';

const CoinSafeAreaView = styled.SafeAreaView``;
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
        setIsLoading(true);
        axios
            .get(`https://api.coincap.io/v2/assets/${idCoin}`)
            .then(({ data }) => {
                setCoin(data.data);
            })
            .catch(() => Alert.alert('Error', 'Failed to load!'));
        axios
            .get(
                `https://api.coincap.io/v2/assets/${idCoin}/history?interval=d1`,
            )
            .then(({ data }) => {
                const arrHistoryCoin = data.data.map((e) => {
                    let dateChange = JSON.stringify(moment(e.time)).slice(
                        1,
                        11,
                    );
                    let daysOfTheWeek = DAYS_OF_THE_WEEK.find(
                        (day) => day.id === new Date(dateChange).getDay(),
                    );
                    return {
                        priceUsd: Number(e.priceUsd),
                        dateChange,
                        daysOfTheWeek,
                    };
                });
                setHistoryCoin(arrHistoryCoin.slice(-15));
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
                let tenMinutes = currentTime - 600000;
                axios
                    .get(
                        `https://api.coincap.io/v2/assets/${idCoin}/history?interval=m1&start=${tenMinutes}&end=${currentTime}`,
                    )
                    .then(({ data }) => {
                        const arrHistoryCoin = data.data.map((e) => {
                            let dateChange = moment(e.time).format('hh:mm');
                            console.log(Number(e.priceUsd));
                            return {
                                priceUsd: Number(e.priceUsd),
                                dateChange,
                            };
                        });
                        setHistoryCoin(arrHistoryCoin);
                    })
                    .catch(() => Alert.alert('Error', 'Failed to load!'));
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
                <CoinSafeAreaView>
                    <ScrollView>
                        <CoinScrollView>
                            <Crypto
                                title={coin.name}
                                price={coin.priceUsd}
                                symbol={coin.symbol}
                                changePrecent={coin.changePercent24Hr}
                                rank={coin.rank}
                            />
                        </CoinScrollView>
                        <HeaderText text="Chart" />
                        <DropDownPicker
                            open={open}
                            value={timePeriod}
                            items={items}
                            setOpen={setOpen}
                            setValue={setTimePeriod}
                            setItems={setItems}
                            theme="DARK"
                            placeholder={TIME_PERIODS[0].label}
                        />
                        <View
                            style={{
                                marginLeft: 15,
                                marginRight: 15,
                                color: 'white',
                            }}>
                            <VictoryChart
                                height={400}
                                padding={{
                                    top: 40,
                                    bottom: 80,
                                    left: 65,
                                    right: 35,
                                }}
                                containerComponent={
                                    <VictoryVoronoiContainer
                                        labels={({ datum }) =>
                                            `${datum.priceUsd.toFixed(4)}`
                                        }
                                    />
                                }>
                                <VictoryLine
                                    style={{
                                        data: { stroke: '#c43a31' },
                                    }}
                                    data={historyCoin}
                                    y="priceUsd"
                                    x="dateChange"
                                    animate={{
                                        duration: 1000,
                                        onLoad: {
                                            duration: 1000,
                                        },
                                    }}
                                />
                                <VictoryAxis
                                    style={{
                                        axis: { stroke: '#fff' },
                                        grid: {
                                            stroke: 'gray',
                                        },
                                        tickLabels: {
                                            padding: 1,
                                            angle: 90,
                                            verticalAnchor: 'end',
                                            textAnchor: 'start',
                                            fill: '#aaa',
                                        },
                                    }}
                                />
                                <VictoryAxis
                                    dependentAxis
                                    style={{
                                        axis: { stroke: '#fff' },
                                        grid: {
                                            stroke: 'gray',
                                        },
                                        tickLabels: {
                                            fill: '#aaa',
                                        },
                                    }}
                                />
                            </VictoryChart>
                        </View>
                        <View
                            style={{
                                marginLeft: 15,
                                marginRight: 15,
                                color: 'white',
                            }}>
                            <VictoryChart
                                height={400}
                                padding={{
                                    top: 40,
                                    bottom: 80,
                                    left: 65,
                                    right: 35,
                                }}
                                containerComponent={
                                    <VictoryVoronoiContainer
                                        labels={({ datum }) =>
                                            `${datum.priceUsd.toFixed(4)}`
                                        }
                                    />
                                }>
                                <VictoryLine
                                    style={{
                                        data: { stroke: '#c43a31' },
                                    }}
                                    data={historyCoin}
                                    y="priceUsd"
                                    x="dateChange"
                                    animate={{
                                        duration: 1000,
                                        onLoad: {
                                            duration: 1000,
                                        },
                                    }}
                                />
                                <VictoryAxis
                                    style={{
                                        axis: { stroke: '#fff' },
                                        grid: {
                                            stroke: 'gray',
                                        },
                                        tickLabels: {
                                            padding: 1,
                                            angle: 90,
                                            verticalAnchor: 'end',
                                            textAnchor: 'start',
                                            fill: '#aaa',
                                        },
                                    }}
                                />
                                <VictoryAxis
                                    dependentAxis
                                    style={{
                                        axis: { stroke: '#fff' },
                                        grid: {
                                            stroke: 'gray',
                                        },
                                        tickLabels: {
                                            fill: '#aaa',
                                        },
                                    }}
                                />
                            </VictoryChart>
                        </View>
                    </ScrollView>
                </CoinSafeAreaView>
            )}
        </View>
    );
};
