import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import React from 'react';

const RefreshView = styled.View`
    padding: 10px 15px;
`;

export const Refresh = ({ fetchCoins }) => {
    return (
        <RefreshView>
            <TouchableOpacity>
                <Icon
                    size={24}
                    name="reload"
                    color="white"
                    onPress={fetchCoins}
                    style={{ marginLeft: 'auto' }}
                />
            </TouchableOpacity>
        </RefreshView>
    );
};
