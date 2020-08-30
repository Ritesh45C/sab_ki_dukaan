import styled from 'styled-components/native'; 
import { Metrics, Colors } from 'Theme';

export const Container = styled.View`
flex: 1;
background-color:${Colors.gray200}
`
export const OrdersContainer = styled.View`
width:100%;
height:100%;
`
export const Title = styled.Text`
font-size:16px;
font-weight:bold;
`

export const OrderDetail = styled.View`
width:100%;
height:100%;
background-color:${Colors.primary}
align-items:center;
justify-content:center;
`
export const OrderDetailTitle = styled.Text`
text-align:center;
color:${Colors.white};
font-weight:bold;
`
export const OrderDetailValue = styled.Text`
color:${Colors.white};
text-align:center;
font-weight:bold;
`