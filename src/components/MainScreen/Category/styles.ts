import styled from 'styled-components/native'; 
import {Metrics} from 'Theme'
export const Container =   styled.View`
width:100%;
margin: ${Metrics.baseMargin}px;
`;


export const Title_Category = styled.Text`
font-size: 16px;
font-weight:bold;
margin-bottom: ${Metrics.baseMargin}px;

`
export const Sub_Category_Image = styled.Image`
width: 90px;
height: 48px;
border-radius: 5px;
`


export const Sub_Category = styled.TouchableOpacity`
  width: 90px;
  height: 48px;
`;

export const Title_SubCategory = styled.Text`
font-size:13px;
max-width:90px;
`;

