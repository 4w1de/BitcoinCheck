import { Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const LoaderView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #333333;
`;
const TextLoader = styled.Text`
    color: #ffffff;
    font-size: 24px;
`;

export const Loader = () => {
    return (
        <LoaderView>
            <ActivityIndicator size="large" color="#ff0000" />
            <TextLoader>Loading...</TextLoader>
        </LoaderView>
    );
};
