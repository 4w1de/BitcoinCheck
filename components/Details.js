import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

import { pointsInNumber } from '../api/transformNumber';
import { currencyConverter } from '../api/currencyConverter';

import { DETAILS_TITLES } from '../constants/details';
import { CUSTOM_COLORS } from '../constants/colors';

const DetailsView = styled.View``;
const Symbol = styled.Text`
    font-size: 48px;
    font-weight: 700;
    color: ${CUSTOM_COLORS.SYMBOL_COLOR};
    text-align: center;
    margin: -14px 0;
    text-shadow: 2px 2px 1px #000;
`;
const CoinName = styled.Text`
    font-size: 24px;
    font-weight: bolder;
    color: ${CUSTOM_COLORS.MAIN_COLOR_TEXT};
    text-align: center;
`;
const Rank = styled.Text`
    font-size: 14px;
    color: red;
    text-align: center;
`;
const AdditionalInfoView = styled.View`
    margin: 20px 0 0;
    flex: 1;
    flex-direction: row;
`;
const AdditionalInfoTitle = styled.Text`
    font-size: 14px;
    color: ${CUSTOM_COLORS.MAIN_COLOR_TEXT};
    flex-wrap: wrap;
    max-width: 65%;
`;
const AdditionalInfoValueView = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    margin-left: auto;
    flex-wrap: wrap;
`;
const Supply = styled.Text`
    font-size: 14px;
    color: ${CUSTOM_COLORS.MAIN_COLOR_TEXT};
    font-weight: 600;
`;
const MaxSupply = styled.Text`
    font-size: 14px;
    color: ${CUSTOM_COLORS.MAX_SUPPLY_COLOR};
`;
const Dollar = styled.Text`
    font-size: 14px;
    color: ${CUSTOM_COLORS.DOLLAR_COLOR};
    font-weight: bolder;
`;
const Price = styled.Text`
    font-size: 14px;
    color: ${CUSTOM_COLORS.MAIN_COLOR_TEXT};
`;
const ChangePercentUp = styled.Text`
    color: ${CUSTOM_COLORS.CHANGE_PRICE_UP};
    font-size: 14px;
`;
const ChangePercentDown = styled.Text`
    color: ${CUSTOM_COLORS.CHANGE_PRICE_DOWN};
    font-size: 14px;
`;

export const Details = ({ coin, currencySymbol, symbolCur, rateUsd }) => {
    return (
        <DetailsView>
            <Symbol>{coin.symbol}</Symbol>
            <CoinName>({coin.name})</CoinName>
            <Rank>
                {DETAILS_TITLES.RANK}
                {coin.rank}
            </Rank>
            <AdditionalInfoView>
                <AdditionalInfoTitle>
                    {DETAILS_TITLES.PRICE}
                </AdditionalInfoTitle>
                <AdditionalInfoValueView>
                    <Dollar>
                        {currencySymbol ? currencySymbol : symbolCur}{' '}
                    </Dollar>
                    <Price>
                        {pointsInNumber(
                            currencyConverter(coin.priceUsd, rateUsd),
                            4,
                        )}
                    </Price>
                </AdditionalInfoValueView>
            </AdditionalInfoView>
            <AdditionalInfoView>
                <AdditionalInfoTitle>
                    {DETAILS_TITLES.SUPPLY}
                </AdditionalInfoTitle>
                <AdditionalInfoValueView>
                    <Supply>{pointsInNumber(coin.supply, 0)}/</Supply>
                    <MaxSupply>{pointsInNumber(coin.maxSupply, 0)}</MaxSupply>
                </AdditionalInfoValueView>
            </AdditionalInfoView>
            <AdditionalInfoView>
                <AdditionalInfoTitle>
                    {DETAILS_TITLES.MARKET_CAP}
                </AdditionalInfoTitle>
                <AdditionalInfoValueView>
                    <Dollar>
                        {currencySymbol ? currencySymbol : symbolCur}{' '}
                    </Dollar>
                    <Price>
                        {pointsInNumber(
                            currencyConverter(coin.marketCapUsd, rateUsd),
                            2,
                        )}
                    </Price>
                </AdditionalInfoValueView>
            </AdditionalInfoView>
            <AdditionalInfoView>
                <AdditionalInfoTitle>
                    {DETAILS_TITLES.CHANGE_PERCENT}
                </AdditionalInfoTitle>
                <AdditionalInfoValueView>
                    {coin.changePercent24Hr < 0 ? (
                        <ChangePercentDown>
                            &#5167;
                            {pointsInNumber(
                                currencyConverter(
                                    coin.changePercent24Hr,
                                    rateUsd,
                                ),
                                5,
                            )}
                        </ChangePercentDown>
                    ) : (
                        <ChangePercentUp>
                            &#5169;
                            {pointsInNumber(
                                currencyConverter(
                                    coin.changePercent24Hr,
                                    rateUsd,
                                ),
                                5,
                            )}
                        </ChangePercentUp>
                    )}
                </AdditionalInfoValueView>
            </AdditionalInfoView>
            <AdditionalInfoView>
                <AdditionalInfoTitle>{DETAILS_TITLES.VWAP}</AdditionalInfoTitle>
                <AdditionalInfoValueView>
                    <Dollar>
                        {currencySymbol ? currencySymbol : symbolCur}{' '}
                    </Dollar>
                    <Price>
                        {pointsInNumber(
                            currencyConverter(coin.vwap24Hr, rateUsd),
                            2,
                        )}
                    </Price>
                </AdditionalInfoValueView>
            </AdditionalInfoView>
        </DetailsView>
    );
};
