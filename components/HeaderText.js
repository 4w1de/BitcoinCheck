import { Text, View } from 'react-native';
import styled from 'styled-components';

const InfoTextView = styled.View`
    align-items: center;
    margin-top: 15px;
`;
const InfoText = styled.Text`
    color: #ffffff;
    font-size: 24px;
`;

export const HeaderText = ({ text }) => {
    return (
        <InfoTextView>
            <InfoText>{text}</InfoText>
        </InfoTextView>
    );
};
