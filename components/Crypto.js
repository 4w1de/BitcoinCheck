import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const CryptoVies = styled.View`
    flex: 1;
    flex-direction: row;
    padding: 15px 10px;
    margin: 0 15px;
    border-bottom-width: 1px;
    border-bottom-color: rgba(255, 255, 255, 0.5);
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
    color: white;
`;
const Price = styled.Text`
    color: white;
    font-size: 14px;
    text-align: right;
`;
const Symbol = styled.Text`
    font-size: 24px;
    font-weight: bolder;
    color: #ff1144;
    width: 100px;
`;
const ChangePercentUp = styled.Text`
    color: #00ff00;
    font-size: 12px;
    text-align: right;
`;
const ChangePercentDown = styled.Text`
    color: #ff0000;
    font-size: 12px;
    text-align: right;
`;

export const Crypto = ({ rank, title, price, symbol, changePrecent }) => {
    return (
        <CryptoVies>
            <Symbol>{symbol}</Symbol>
            <Title>({title})</Title>
            <CryptoDetails>
                <Price>${parseFloat(price).toFixed(3)}</Price>
                {changePrecent < 0 ? (
                    <ChangePercentDown>
                        &#5167;{parseFloat(changePrecent).toFixed(5)}
                    </ChangePercentDown>
                ) : (
                    <ChangePercentUp>
                        &#5169;{parseFloat(changePrecent).toFixed(5)}
                    </ChangePercentUp>
                )}
            </CryptoDetails>
        </CryptoVies>
    );
};
