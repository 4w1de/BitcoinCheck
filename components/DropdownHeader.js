import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { SORT_MAP } from '../constants/sort';
import { RATES } from '../constants/urls';
import { getCurrency } from '../api/getCurrency';
import { sortingCurrency } from '../api/sorting';

const DropdownHeaderView = styled.View`
    padding: 10px 15px;
    flex-direction: row;
`;

export const DropdownHeader = ({ sort, setSort }) => {
    const dispatch = useDispatch();
    const curr = useSelector((store) => store);
    const { value } = useSelector((reducer) => reducer.currency);

    const [itemsSort, setItemsSort] = React.useState(SORT_MAP);
    const [openSort, setOpenSort] = React.useState(false);
    const [itemsCurrency, setItemsCurrency] = React.useState([]);
    const [openCurrency, setOpenCurrency] = React.useState(false);
    const [currency, setCurrency] = React.useState(
        value ? value : 'united-states-dollar',
    );

    const fetchCurrency = () => {
        axios.get(RATES).then(({ data }) => {
            let currencyArr = sortingCurrency(
                data.data.map((e) => {
                    return {
                        label: `${e.symbol} (${e.id}, ${
                            e.currencySymbol ? e.currencySymbol : e.symbol
                        })`,
                        value: e.id,
                    };
                }),
            );
            setItemsCurrency(currencyArr);
        });
    };

    React.useEffect(fetchCurrency, []);

    return (
        <DropdownHeaderView>
            <View style={{ width: '48%', marginRight: '2%' }}>
                <DropDownPicker
                    open={openSort}
                    value={sort}
                    items={itemsSort}
                    setOpen={setOpenSort}
                    setValue={setSort}
                    setItems={setItemsSort}
                    theme="DARK"
                    placeholder={'Select sort'}
                    dropDownDirection="AUTO"
                    bottomOffset={100}
                    selectedItemContainerStyle={{
                        backgroundColor: 'grey',
                    }}
                    listMode="MODAL"
                    modalTitle="Select sorting"
                    modalContentContainerStyle={{
                        backgroundColor: '#333333',
                    }}
                    style={{
                        backgroundColor: '#333333',
                        borderRadius: 0,
                        borderColor: '#555555',
                    }}
                />
            </View>
            <View style={{ width: '48%', marginLeft: '2%' }}>
                <DropDownPicker
                    open={openCurrency}
                    value={currency}
                    items={itemsCurrency}
                    setOpen={setOpenCurrency}
                    setValue={setCurrency}
                    setItems={setItemsCurrency}
                    onSelectItem={(item) => {
                        dispatch(getCurrency(item.value));
                    }}
                    theme="DARK"
                    placeholder={'Select currency'}
                    dropDownDirection="AUTO"
                    bottomOffset={100}
                    searchable={true}
                    searchPlaceholder="Search..."
                    selectedItemContainerStyle={{
                        backgroundColor: 'grey',
                    }}
                    itemKey="value"
                    listMode="MODAL"
                    modalTitle="Select currency"
                    modalContentContainerStyle={{
                        backgroundColor: '#333333',
                    }}
                    style={{
                        backgroundColor: '#333333',
                        borderRadius: 0,
                        borderColor: '#555555',
                    }}
                />
            </View>
        </DropdownHeaderView>
    );
};
