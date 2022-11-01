import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

import { pointsInNumber } from '../api/transformNumber';

import { CUSTOM_COLORS } from '../constants/colors';

const CryptoVies = styled.View`
    flex: 1;
    flex-direction: row;
    padding: 15px 0px;
    margin: 0 15px;
    border-bottom-width: 1px;
    border-bottom-color: ${CUSTOM_COLORS.LINE_BETWEEN};
    border-bottom-style: solid;
`;
const CryptoDetails = styled.View`
    justify-content: center;
    margin-left: auto;
`;
const Title = styled.Text`
    font-size: 14px;
    font-weight: bolder;
    margin: auto 0;
    color: ${CUSTOM_COLORS.MAIN_COLOR_TEXT};
    word-wrap: break-word;
    width: 120px;
`;
const Price = styled.Text`
    color: ${CUSTOM_COLORS.MAIN_COLOR_TEXT};
    font-size: 14px;
    text-align: right;
`;
const Symbol = styled.Text`
    font-size: 24px;
    font-weight: bolder;
    color: ${CUSTOM_COLORS.SYMBOL_COLOR};
    width: 100px;
`;
const ChangePercentUp = styled.Text`
    color: ${CUSTOM_COLORS.CHANGE_PRICE_UP};
    font-size: 12px;
    text-align: right;
`;
const ChangePercentDown = styled.Text`
    color: ${CUSTOM_COLORS.CHANGE_PRICE_DOWN};
    font-size: 12px;
    text-align: right;
`;
const Dollar = styled.Text`
    font-size: 14px;
    color: ${CUSTOM_COLORS.DOLLAR_COLOR};
    font-weight: bolder;
`;

export const Crypto = ({
    rank = 1,
    title = 1,
    price = 1,
    symbol = 1,
    changePrecent = 1,
    symbolCur = 1,
    currencySymbol = 1,
}) => {
    return (
        <CryptoVies>
            <Symbol>{symbol}</Symbol>
            <Title>
                ({title}) #{rank}
            </Title>
            <CryptoDetails>
                <Price>
                    <Dollar>
                        {currencySymbol ? currencySymbol : symbolCur}{' '}
                    </Dollar>
                    {pointsInNumber(price, 4)}
                </Price>
                {changePrecent < 0 ? (
                    <ChangePercentDown>
                        &#5167;{pointsInNumber(changePrecent, 5)}
                    </ChangePercentDown>
                ) : (
                    <ChangePercentUp>
                        &#5169;{pointsInNumber(changePrecent, 5)}
                    </ChangePercentUp>
                )}
            </CryptoDetails>
        </CryptoVies>
    );
};
