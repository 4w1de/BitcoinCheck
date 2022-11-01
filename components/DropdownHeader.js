import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { getCurrency } from '../api/getCurrency';
import { sortingCurrency } from '../api/sorting';

import { SORT_MAP } from '../constants/sort';
import { RATES } from '../constants/urls';
import { CUSTOM_COLORS } from '../constants/colors';
import { SORTING_DROPDOWN, CURRENCY_DROPDOWN } from '../constants/dropdownInfo';

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
    const [currency, setCurrency] = React.useState('united-states-dollar');

    const fetchCurrency = () => {
        setCurrency(value);
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

    React.useEffect(fetchCurrency, [value]);

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
                    theme={CUSTOM_COLORS.NAME_THEME}
                    placeholder={SORTING_DROPDOWN}
                    dropDownDirection="AUTO"
                    bottomOffset={100}
                    selectedItemContainerStyle={{
                        backgroundColor: CUSTOM_COLORS.SELECTED,
                    }}
                    listMode="MODAL"
                    modalTitle={SORTING_DROPDOWN}
                    modalContentContainerStyle={{
                        backgroundColor: CUSTOM_COLORS.BACKGROUND_COLOR,
                    }}
                    style={{
                        backgroundColor: CUSTOM_COLORS.BACKGROUND_COLOR,
                        borderRadius: 0,
                        borderColor: CUSTOM_COLORS.BORDER_DROPDOWN,
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
                    theme={CUSTOM_COLORS.NAME_THEME}
                    placeholder={CURRENCY_DROPDOWN}
                    dropDownDirection="AUTO"
                    bottomOffset={100}
                    searchable={true}
                    searchPlaceholder="Search..."
                    selectedItemContainerStyle={{
                        backgroundColor: CUSTOM_COLORS.SELECTED,
                    }}
                    itemKey="value"
                    listMode="MODAL"
                    modalTitle={CURRENCY_DROPDOWN}
                    modalContentContainerStyle={{
                        backgroundColor: CUSTOM_COLORS.BACKGROUND_COLOR,
                    }}
                    style={{
                        backgroundColor: CUSTOM_COLORS.BACKGROUND_COLOR,
                        borderRadius: 0,
                        borderColor: CUSTOM_COLORS.BORDER_DROPDOWN,
                    }}
                />
            </View>
        </DropdownHeaderView>
    );
};
