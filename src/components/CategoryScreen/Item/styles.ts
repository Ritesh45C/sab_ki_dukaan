import styled from 'styled-components/native'; 
import {Metrics, Colors} from 'Theme'

export const TouchableContainer = styled.TouchableOpacity`
width:100%;
height:128px;
background-color:${Colors.white};
margin-vertical:${Metrics.smallMargin}px;
padding-horizontal:${Metrics.baseMargin}px;
border-radius: 20px;
flex-direction:row;
`

export const ItemDetails = styled.View`
width:60%;

margin-left:${Metrics.baseMargin}px;
justify-content:center;

`
export const ItemActions = styled.View`
width:60%;
`

export const ItemTitle = styled.Text`
font-size:16px;
font-weight:bold;
color:#6D6C6C;
`
export const ItemSubTitle = styled.Text`
font-size:14px;
color:#6D6C6C;
`
export const ItemPriceDetail = styled.Text`

font-size:14px;
color:#6D6C6C;
`
export const ItemDiscountDetail = styled.Text`
font-size:14px;
color:#3AB23A;
margin-left:${Metrics.smallMargin}px
`
export const ItemPreviousPrice = styled.Text`
font-size:14px;
color:${Colors.grayLight};
margin-left:${Metrics.smallMargin}px;
text-decoration-line: line-through
`
export const ImageAndProductDetailsContainer = styled.View`
flex-direction:row;
align-items:center;
`

export const ItemPriceDetailsContainer = styled.View`
flex-direction:row;
flex-wrap: wrap;`


export const ItemUnits = styled.Text`
text-align:center;
`
