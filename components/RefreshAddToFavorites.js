import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import React from 'react';

import { ADD_REM_FAVORITES } from '../constants/pathAndIcon';
import { MAIN_COLOR_TEXT } from '../constants/colors';

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
                    name={
                        !isAddedToFavorites
                            ? ADD_REM_FAVORITES.ADDED_FAVORITE.icon
                            : ADD_REM_FAVORITES.REMOVE_FAVORITE.icon
                    }
                    color={MAIN_COLOR_TEXT}
                    onPress={() => addToFavorites()}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 'auto' }}>
                <Icon
                    size={24}
                    name="reload"
                    color={MAIN_COLOR_TEXT}
                    onPress={fetchCoins}
                />
            </TouchableOpacity>
        </RefreshView>
    );
};
