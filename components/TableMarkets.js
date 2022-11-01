import { View } from 'react-native';
import React from 'react';
import styled from 'styled-components';
import { Table, Row } from 'react-native-table-component';
import { LogBox } from 'react-native';

import { InfoTextCenter } from './InfoTextCenter';

import { HEADER_MARKETS_TABLE } from '../constants/headerMarketsTable';
import { TABLE_COLORS, MAIN_COLOR_TEXT } from '../constants/colors';

const MarketsView = styled(Table)`
    background-color: ${TABLE_COLORS.ROWS_TYPE_1};
    margin: 16px 0 20px;
`;
const HeaderTable = styled(Row)`
    background-color: ${TABLE_COLORS.HEADER};
    text-align: center;
    color: ${MAIN_COLOR_TEXT};
    height: 80px;
`;
const RowTable = styled(Row)`
    margin: 0;
`;
LogBox.ignoreAllLogs();

export const TableMarkets = ({ markets }) => {
    return (
        <View>
            <InfoTextCenter text={'Markets'} />
            <MarketsView borderStyle={{ borderWidth: 0 }}>
                <HeaderTable
                    data={HEADER_MARKETS_TABLE}
                    textStyle={{
                        color: MAIN_COLOR_TEXT,
                        textAlign: 'center',
                        fontSize: 18,
                    }}
                />
                {markets.map((rowData, index) => (
                    <RowTable
                        key={index}
                        data={rowData}
                        style={
                            index % 2 == 0 && {
                                backgroundColor: TABLE_COLORS.ROWS_TYPE_2,
                            }
                        }
                        textStyle={{
                            color: MAIN_COLOR_TEXT,
                            textAlign: 'center',
                            fontSize: 14,
                        }}
                    />
                ))}
            </MarketsView>
        </View>
    );
};
