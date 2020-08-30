import styled from 'styled-components/native';
import Metrics from 'Theme/Metrics';
import { Colors } from 'Theme';

export const Container = styled.View`
flex:1;
align-items:center;
justify-content:center;
margin-top:${Metrics.baseMargin}px;
`

export const OrderContainer = styled.TouchableOpacity`
  width: 95%;
  height: 100%;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  padding-horizontal:${Metrics.baseMargin}px;
  padding-vertical:${Metrics.mediumMargin}px;
  background-color:${Colors.white}
  border-radius:20px;
`;

export const OrderDateContainer = styled.View``;

export const MonthText = styled.Text`
font-size:14px;
font-weight:bold;
`;

export const DayText = styled.Text``;

export const OrderDetailContainer = styled.View`
width:30%;
`;

export const PriceText = styled.Text`
font-size:14px;
font-weight:bold;
text-align:center;`;

export const ItemsText = styled.Text`text-align:center; font-weight:bold; font-size: 12px`;
