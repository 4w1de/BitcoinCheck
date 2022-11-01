import { Text, View } from 'react-native';
import styled from 'styled-components';

import { MAIN_COLOR_TEXT } from '../constants/colors';

const InfoTextView = styled.View`
    align-items: center;
    margin-top: 15px;
`;
const InfoText = styled.Text`
    color: ${MAIN_COLOR_TEXT};
    font-size: 24px;
`;

export const HeaderText = ({ text }) => {
    return (
        <InfoTextView>
            <InfoText>{text}</InfoText>
        </InfoTextView>
    );
};
