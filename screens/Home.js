import { StatusBar } from 'expo-status-bar';
import {
    Text,
    View,
    Alert,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import * as NavigationBar from 'expo-navigation-bar';
import styled from 'styled-components';

import { Crypto } from '../components/Crypto';
import { SearchCrypto } from '../components/SearchCrypto';
import { Refresh } from '../components/Refresh';
import { Loader } from '../components/Loader';
import { InfoTextCenter } from '../components/InfoTextCenter';

import { store } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';

import { COINCAP } from '../constants/urls';
import { DropdownHeader } from '../components/DropdownHeader';
import { currencyConverter } from '../api/currencyConverter';

export const Home = ({ navigation }) => {
    const {
        rateUsd,
        currencySymbol,
        symbol: symbolCur,
    } = useSelector((reducer) => reducer.currency);

    const [coins, setCoins] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [textSearch, setTextSearch] = React.useState('');

    const fetchCoins = () => {
        setIsLoading(true);
        axios
            .get(COINCAP)
            .then(({ data }) => {
                let copyCoins = data.data.filter(
                    (coin) =>
                        coin.symbol
                            .toLowerCase()
                            .includes(textSearch.toLowerCase()) ||
                        coin.name
                            .toLowerCase()
                            .includes(textSearch.toLowerCase()),
                );
                setCoins(copyCoins);
            })
            .catch(() => Alert.alert('Error', 'Failed to load!'))
            .finally(() => {
                setIsLoading(false);
            });
    };

    React.useEffect(fetchCoins, [textSearch]);

    return (
        <View style={{ backgroundColor: '#333333', height: '100%' }}>
            <Refresh fetchCoins={fetchCoins} />
            <SearchCrypto
                textSearch={textSearch}
                setTextSearch={setTextSearch}
            />
            <DropdownHeader />
            {isLoading ? (
                <Loader />
            ) : (
                <View style={{ marginBottom: 100 }}>
                    {coins.length ? (
                        <FlatList
                            windowSize={30}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isLoading}
                                    onRefresh={fetchCoins}
                                />
                            }
                            data={coins}
                            initialNumToRender={coins.length}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('CoinInfo', {
                                            idCoin: item.id,
                                            title: item.name,
                                        })
                                    }>
                                    <Crypto
                                        title={item.name}
                                        price={currencyConverter(
                                            item.priceUsd,
                                            rateUsd,
                                        )}
                                        symbol={item.symbol}
                                        changePrecent={currencyConverter(
                                            item.changePercent24Hr,
                                            rateUsd,
                                        )}
                                        rank={item.rank}
                                        currencySymbol={currencySymbol}
                                        symbolCur={symbolCur}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    ) : (
                        <InfoTextCenter text="No data" />
                    )}
                </View>
            )}
        </View>
    );
};
