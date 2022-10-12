import styled from 'styled-components/native';
import theme from '@theme/index';

export const Container = styled.View`
flex: 1;
background-color: ${({theme})=> theme.COLORS.GRAY_600};
padding: 24px;
`;