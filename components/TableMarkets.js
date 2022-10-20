import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Table, Row, Rows } from 'react-native-table-component';

import { InfoTextCenter } from './InfoTextCenter';

import { HEADER_MARKETS_TABLE } from '../constants/headerMarketsTable';

const MarketsView = styled(Table)`
    background-color: #444;
    margin: 16px 0 20px;
`;
const HeaderTable = styled(Row)`
    background-color: #222;
    text-align: center;
    color: white;
    height: 80px;
`;
const RowTable = styled(Row)`
    margin: 0;
`;

export const TableMarkets = ({ markets }) => {
    return (
        <View>
            <InfoTextCenter text={'Markets'} />
            <MarketsView borderStyle={{ borderWidth: 0 }}>
                <HeaderTable
                    data={HEADER_MARKETS_TABLE}
                    textStyle={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 18,
                    }}
                />
                {markets.map((rowData, index) => (
                    <RowTable
                        key={index}
                        data={rowData}
                        style={[index % 2 == 0 && { backgroundColor: '#555' }]}
                        textStyle={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 14,
                        }}
                    />
                ))}
            </MarketsView>
        </View>
    );
};
