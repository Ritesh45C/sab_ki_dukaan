import styled from 'styled-components/native'; 
import { Metrics, Colors } from 'Theme';

export const Container = styled.View`
flex: 1;
background-color:${Colors.gray200};
margin-horizontal:${Metrics.baseMargin}
`
export const OrdersContainer = styled.View`
margin-vertical:${Metrics.baseMargin}px;
align-items:center;
`
export const Title = styled.Text`
font-size:16px;
font-weight:bold;
color:${Colors.gray}
margin-vertical:${Metrics.baseMargin}px
`

export const RecurringTypeContainer = styled.View`

`

export const EmptyTextContainer = styled.View`
  flex: 1;
  justify-content: center;
  margin-horizontal: ${Metrics.baseMargin}px;
`;
export const EmptyText = styled.Text`
  text-align: center;
  font-size:16px;
`;
