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

export const Home = ({ navigation }) => {
    const [coins, setCoins] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [textSearch, setTextSearch] = React.useState('');

    const fetchCoins = () => {
        setIsLoading(true);
        axios
            .get('https://api.coincap.io/v2/assets')
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

    React, useEffect(fetchCoins, [textSearch]);

    return (
        <View style={{ backgroundColor: '#333333', height: '100%' }}>
            <Refresh fetchCoins={fetchCoins} />
            <SearchCrypto
                textSearch={textSearch}
                setTextSearch={setTextSearch}
            />
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
                                        price={item.priceUsd}
                                        symbol={item.symbol}
                                        changePrecent={item.changePercent24Hr}
                                        rank={item.rank}
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
