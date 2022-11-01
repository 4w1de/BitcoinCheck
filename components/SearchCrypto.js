import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import React from 'react';

import { CUSTOM_COLORS } from '../constants/colors';
import { SEARCH_ICON_TITLE, CLOSE_ICON_TITLE } from '../constants/pathAndIcon';

const SearchView = styled.View`
    background-color: ${CUSTOM_COLORS.BACKROUND_SEARCH};
    flex-direction: row;
    justify-content: space-between;
`;
const SearchInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    margin: 0;
    color: ${CUSTOM_COLORS.MAIN_COLOR_TEXT};
`;
const ButtonSearchView = styled.View`
    padding: 10px 0px 10px 15px;
`;
const ButtonClearView = styled.View`
    padding: 10px 15px 10px 0px;
`;

export const SearchCrypto = ({ textSearch, setTextSearch, onSearchEnter }) => {
    const [newText, setNewText] = React.useState('');
    return (
        <SearchView>
            <TouchableOpacity>
                <ButtonSearchView>
                    <Icon
                        size={24}
                        name={SEARCH_ICON_TITLE.icon}
                        style={{ marginTop: 4, marginRight: 7 }}
                        color={CUSTOM_COLORS.MAIN_COLOR_TEXT}
                        onPress={() => {
                            setTextSearch(newText);
                        }}
                    />
                </ButtonSearchView>
            </TouchableOpacity>
            <SearchInput
                disableFullscreenUI={true}
                placeholder={SEARCH_ICON_TITLE.placeholder}
                placeholderTextColor={CUSTOM_COLORS.MAIN_COLOR_TEXT}
                value={newText}
                onChangeText={(newTextSearch) => {
                    setNewText(newTextSearch);
                }}
                onEndEditing={() => {
                    setTextSearch(newText);
                }}
            />
            <TouchableOpacity>
                <ButtonClearView>
                    <Icon
                        size={28}
                        name={CLOSE_ICON_TITLE.icon}
                        color={CUSTOM_COLORS.MAIN_COLOR_TEXT}
                        style={{ marginTop: 4 }}
                        onPress={() => {
                            setNewText('');
                            setTextSearch('');
                        }}
                    />
                </ButtonClearView>
            </TouchableOpacity>
        </SearchView>
    );
};
