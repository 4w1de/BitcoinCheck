import { Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import styled from 'styled-components';

import {
    BACKGROUND_COLOR,
    MAIN_COLOR_TEXT,
    COLOR_PRELOADER,
} from '../constants/colors';
import { LOADER } from '../constants/helpText';

const LoaderView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${BACKGROUND_COLOR};
`;
const TextLoader = styled.Text`
    color: ${MAIN_COLOR_TEXT};
    font-size: 24px;
`;

export const Loader = () => {
    return (
        <LoaderView>
            <ActivityIndicator size="large" color={COLOR_PRELOADER} />
            <TextLoader>{LOADER}</TextLoader>
        </LoaderView>
    );
};
