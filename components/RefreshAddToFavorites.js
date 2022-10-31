import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import React from 'react';

const RefreshView = styled.View`
    padding: 10px 15px;
    flex-direction: row;
`;

export const RefreshAddToFavorites = ({
    fetchCoins,
    addToFavorites,
    isAddedToFavorites,
}) => {
    return (
        <RefreshView>
            <TouchableOpacity>
                <Icon
                    size={24}
                    name={!isAddedToFavorites ? 'bookmark-outline' : 'bookmark'}
                    color="white"
                    onPress={() => addToFavorites()}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 'auto' }}>
                <Icon
                    size={24}
                    name="reload"
                    color="white"
                    onPress={fetchCoins}
                />
            </TouchableOpacity>
        </RefreshView>
    );
};
