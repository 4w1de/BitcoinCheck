import {
    View,
    Alert,
    FlatList,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

import { Crypto } from '../components/Crypto';
import { SearchCrypto } from '../components/SearchCrypto';
import { Refresh } from '../components/Refresh';
import { Loader } from '../components/Loader';
import { InfoTextCenter } from '../components/InfoTextCenter';
import { DropdownHeader } from '../components/DropdownHeader';

import { sorting } from '../api/sorting';
import { currencyConverter } from '../api/currencyConverter';

import { COINCAP } from '../constants/urls';
import { SORT_OBJ } from '../constants/sort';
import { HOME_PATH_ICON } from '../constants/pathAndIcon';
import { NO_DATA } from '../constants/helpText';
import { ERROR_AXIOS } from '../constants/error';
import { FAVORITES_KEY } from '../constants/asyncStorage';
import { BACKGROUND_COLOR } from '../constants/colors';
import { SCREENS_TITLE } from '../constants/screensTitle';

export const Favorites = ({ navigation }) => {
    const {
        rateUsd,
        currencySymbol,
        symbol: symbolCur,
    } = useSelector((reducer) => reducer.currency);

    const [coins, setCoins] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [textSearch, setTextSearch] = React.useState('');
    const [sort, setSort] = React.useState(SORT_OBJ.POPULARITY.value);
    let favorites = [];
    const getFavorites = async () => {
        let arr = '[]';
        await AsyncStorage.getItem(FAVORITES_KEY).then((e) => {
            arr = e;
        });
        favorites = arr ? JSON.parse(arr) : [];

        axios
            .get(COINCAP)
            .then(({ data }) => {
                let copyCoins = sorting(
                    data.data
                        .filter((e) => favorites.includes(e.id))
                        .filter(
                            (coin) =>
                                coin.symbol
                                    .toLowerCase()
                                    .includes(textSearch.toLowerCase()) ||
                                coin.name
                                    .toLowerCase()
                                    .includes(textSearch.toLowerCase()),
                        ),
                    sort,
                );
                setCoins(copyCoins);
            })
            .catch(() =>
                Alert.alert(ERROR_AXIOS.title, ERROR_AXIOS.description),
            )
            .finally(() => {
                setIsLoading(false);
            });
    };

    const fetchCoins = () => {
        setIsLoading(true);
        getFavorites();
    };

    React.useEffect(fetchCoins, [textSearch, sort]);

    return (
        <View style={{ backgroundColor: BACKGROUND_COLOR, height: '100%' }}>
            <Refresh
                fetchCoins={fetchCoins}
                navigation={navigation}
                pathForIcon={HOME_PATH_ICON.pathForIcon}
                iconName={HOME_PATH_ICON.iconName}
            />
            <SearchCrypto
                textSearch={textSearch}
                setTextSearch={setTextSearch}
            />
            <DropdownHeader sort={sort} setSort={setSort} />
            {isLoading ? (
                <Loader />
            ) : (
                <View style={{ marginBottom: 200 }}>
                    {coins.length ? (
                        <FlatList
                            windowSize={102}
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
                                        navigation.navigate(
                                            SCREENS_TITLE.COININFO_SCREEN,
                                            {
                                                idCoin: item.id,
                                                title: item.name,
                                            },
                                        )
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
                        <InfoTextCenter text={NO_DATA} />
                    )}
                </View>
            )}
        </View>
    );
};
