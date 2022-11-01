import { View } from 'react-native';
import React from 'react';
import axios from 'axios';

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
            });
    };

    React.useEffect(fetchCoin, []);

    return (
        <View>
            <Refresh fetchCoin />
            <CoinSafeAreaView>
                <CoinScrollView></CoinScrollView>
            </CoinSafeAreaView>
        </View>
    );
};
