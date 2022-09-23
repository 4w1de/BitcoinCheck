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
import { VictoryPie } from 'victory-native';

import { Refresh } from '../components/Refresh';
import { Crypto } from '../components/Crypto';
import { Loader } from '../components/Loader';

const CoinSafeAreaView = styled.SafeAreaView``;
const CoinScrollView = styled.ScrollView``;

export const CoinInfo = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [coin, setCoin] = React.useState({});
    const [historyCoin, setHistoryCoin] = React.useState([]);
    const [markets, setMarkets] = React.useState([]);

    const fetchCoin = () => {
        setIsLoading(true);
        axios
            .get('https://api.coincap.io/v2/assets/bitcoin')
            .then(({ data }) => {
                setCoin(data.data);
            })
            .catch(() => Alert.alert('Error', 'Failed to load!'))
            .finally(() => {
                setIsLoading(false);
            });
    };

    React.useEffect(fetchCoin, []);

    return (
        <View>
            <Refresh fetchCoins={fetchCoin} />
            {isLoading ? (
                <Loader />
            ) : (
                <CoinSafeAreaView>
                    <CoinScrollView>
                        <Crypto
                            title={coin.name}
                            price={coin.priceUsd}
                            symbol={coin.symbol}
                            changePrecent={coin.changePercent24Hr}
                            rank={coin.rank}
                        />
                    </CoinScrollView>
                    <VictoryPie
                        colorScale={[
                            'tomato',
                            'orange',
                            'gold',
                            'cyan',
                            'navy',
                        ]}
                        data={[
                            { x: 'Cats', y: 35 },
                            { x: 'Dogs', y: 40 },
                            { x: 'Birds', y: 55 },
                        ]}
                    />
                </CoinSafeAreaView>
            )}
        </View>
    );
};
