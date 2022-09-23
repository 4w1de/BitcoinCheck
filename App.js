import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import React, { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import styled from 'styled-components';

import { Home } from './screens/Home';
import { CoinInfo } from './screens/CoinInfo';

export default function App() {
    NavigationBar.setVisibilityAsync('hidden');

    return (
        <View style={{ backgroundColor: '#333333', height: '100%' }}>
            <CoinInfo />

            <StatusBar hidden={true} />
        </View>
    );
}
