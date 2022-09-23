import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import React from 'react';

const SearchView = styled.View`
    background-color: #777777;
    flex-direction: row;
    justify-content: space-between;
`;
const SearchInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    margin: 0;
    color: white;
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
                        name="search"
                        style={{ marginTop: 4, marginRight: 7 }}
                        color="white"
                        onPress={() => {
                            setTextSearch(newText);
                        }}
                    />
                </ButtonSearchView>
            </TouchableOpacity>
            <SearchInput
                disableFullscreenUI={true}
                placeholder="Search"
                placeholderTextColor="white"
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
                        name="close"
                        color="white"
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
