import { View } from 'react-native';
import React from 'react';
import {
    VictoryLine,
    VictoryChart,
    VictoryAxis,
    VictoryVoronoiContainer,
} from 'victory-native';

import { CUSTOM_COLORS } from '../constants/colors';

export const ChartCoin = ({ historyCoin, currencySymbol, symbolCur }) => {
    return (
        <View
            style={{
                color: CUSTOM_COLORS.MAIN_COLOR_TEXT,
            }}>
            <VictoryChart
                height={400}
                padding={{
                    top: 40,
                    bottom: 80,
                    left: 65,
                    right: 35,
                }}
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={({ datum }) =>
                            `${
                                currencySymbol ? currencySymbol : symbolCur
                            } ${datum.priceUsd.toFixed(4)}`
                        }
                    />
                }>
                <VictoryLine
                    style={{
                        data: { stroke: '#c43a31' },
                    }}
                    data={historyCoin}
                    y="priceUsd"
                    x="dateChange"
                    animate={{
                        duration: 500,
                        onLoad: {
                            duration: 500,
                        },
                    }}
                />
                <VictoryAxis
                    style={{
                        axis: { stroke: '#fff' },
                        grid: {
                            stroke: 'gray',
                        },
                        tickLabels: {
                            padding: 1,
                            angle: -45,
                            verticalAnchor: 'end',
                            textAnchor: 'end',
                            fill: '#aaa',
                        },
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    style={{
                        axis: { stroke: '#fff' },
                        grid: {
                            stroke: 'gray',
                        },
                        tickLabels: {
                            fill: '#aaa',
                            padding: 1,
                            angle: -45,
                            verticalAnchor: 'end',
                            textAnchor: 'end',
                        },
                    }}
                />
            </VictoryChart>
        </View>
    );
};
