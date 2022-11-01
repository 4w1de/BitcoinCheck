import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import React from 'react';

import { FAVORITES_PATH_ICON } from '../constants/pathAndIcon';
import { MAIN_COLOR_TEXT } from '../constants/colors';

const RefreshView = styled.View`
    padding: 10px 15px;
    flex-direction: row;
`;

export const Refresh = ({
    fetchCoins,
    navigation,
    iconName = FAVORITES_PATH_ICON.iconName,
    pathForIcon = FAVORITES_PATH_ICON.pathForIcon,
}) => {
    return (
        <RefreshView>
            <TouchableOpacity>
                <Icon
                    size={24}
                    name={iconName}
                    color={MAIN_COLOR_TEXT}
                    onPress={() => navigation.navigate(pathForIcon)}
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
