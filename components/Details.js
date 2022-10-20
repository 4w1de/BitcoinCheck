import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

import { fixedNumber, pointsInNumber } from '../api/transformNumber';

const DetailsView = styled.View``;
const Symbol = styled.Text`
    font-size: 48px;
    font-weight: 700;
    color: green;
    text-align: center;
    margin: -14px 0;
    text-shadow: 2px 2px 1px #000;
`;
const CoinName = styled.Text`
    font-size: 24px;
    font-weight: bolder;
    color: white;
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
    color: white;
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
    color: white;
    font-weight: 600;
`;
const MaxSupply = styled.Text`
    font-size: 14px;
    color: green;
`;
const Dollar = styled.Text`
    font-size: 14px;
    color: green;
    font-weight: bolder;
`;
const Price = styled.Text`
    font-size: 14px;
    color: white;
`;
const ChangePercentUp = styled.Text`
    color: #00ff00;
    font-size: 14px;
`;
const ChangePercentDown = styled.Text`
    color: #ff0000;
    font-size: 14px;
`;

export const Details = ({ coin }) => {
    return (
        <DetailsView>
            <Symbol>{coin.symbol}</Symbol>
            <CoinName>({coin.name})</CoinName>
            <Rank>Rank #{coin.rank}</Rank>
            <AdditionalInfoView>
                <AdditionalInfoTitle>Price: </AdditionalInfoTitle>
                <AdditionalInfoValueView>
                    <Dollar>$</Dollar>
                    <Price>{pointsInNumber(coin.priceUsd, 2)}</Price>
                </AdditionalInfoValueView>
            </AdditionalInfoView>
            <AdditionalInfoView>
                <AdditionalInfoTitle>
                    Available supply for trading:{' '}
                </AdditionalInfoTitle>
                <AdditionalInfoValueView>
                    <Supply>{pointsInNumber(coin.supply, 0)}/</Supply>
                    <MaxSupply>{pointsInNumber(coin.maxSupply, 0)}</MaxSupply>
                </AdditionalInfoValueView>
            </AdditionalInfoView>
            <AdditionalInfoView>
                <AdditionalInfoTitle>
                    Market Cap (supply * price):
                </AdditionalInfoTitle>
                <AdditionalInfoValueView>
                    <Dollar>$</Dollar>
                    <Price>{pointsInNumber(coin.marketCapUsd, 2)}</Price>
                </AdditionalInfoValueView>
            </AdditionalInfoView>
            <AdditionalInfoView>
                <AdditionalInfoTitle>
                    Change percent in the last 24 hours:
                </AdditionalInfoTitle>
                <AdditionalInfoValueView>
                    {coin.changePercent24Hr < 0 ? (
                        <ChangePercentDown>
                            &#5167;{pointsInNumber(coin.changePercent24Hr, 5)}
                        </ChangePercentDown>
                    ) : (
                        <ChangePercentUp>
                            &#5169;{pointsInNumber(coin.changePercent24Hr, 5)}
                        </ChangePercentUp>
                    )}
                </AdditionalInfoValueView>
            </AdditionalInfoView>
            <AdditionalInfoView>
                <AdditionalInfoTitle>
                    Volume Weighted Average Price in the last 24 hours:{' '}
                </AdditionalInfoTitle>
                <AdditionalInfoValueView>
                    <Dollar>$</Dollar>
                    <Price>{pointsInNumber(coin.vwap24Hr, 2)}</Price>
                </AdditionalInfoValueView>
            </AdditionalInfoView>
        </DetailsView>
    );
};
