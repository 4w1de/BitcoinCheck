import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import React, { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import { Home } from './screens/Home';
import { CoinInfo } from './screens/CoinInfo';
import { Navigation } from './screens/Navigation';
import { store } from './redux/store';

export default function App() {
    NavigationBar.setVisibilityAsync('hidden');

    return (
        <Provider store={store}>
            <View style={{ backgroundColor: '#333333', height: '100%' }}>
                <Navigation />

                <StatusBar hidden={true} />
            </View>
        </Provider>
    );
}
