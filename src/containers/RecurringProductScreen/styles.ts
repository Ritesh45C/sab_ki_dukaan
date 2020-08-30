import styled from "styled-components/native";
import { Metrics, Colors } from "Theme";


export const RecurringProductContainer = styled.ScrollView`
flex:1;
background-color:${Colors.white};
`



export const ProductContainer = styled.View`
flex-direction: row;
`

export const ItemDetails = styled.View`
margin-horizontal:${Metrics.largeMargin * 2}px;
margin-vertical:${Metrics.largeMargin}px
`


export const ItemTitle = styled.Text`
font-size:16px;
font-weight:bold;
color:#6D6C6C;
margin-vertical:${Metrics.smallMargin}px;
`
export const ItemSubTitle = styled.Text`
font-size:14px;
color:#6D6C6C;
`
export const ItemAvailable = styled.Text`
margin-vertical:${Metrics.smallMargin}px;
font-size:14px;
font-weight:bold;
color:#6D6C6C;
`

export const ItemImage = styled.View`
justify-content:center;
margin-left:${Metrics.baseMargin}px
`

export const CustomButtonContainer = styled.View`
width: 30%;
margin-vertical:${Metrics.largeMargin}px;
margin-left:${Metrics.smallMargin}px;
`

export const GridContainer = styled.View`
flex-direction:row;
`

export const QuantityWeek = styled.View`
flex-direction:row
justify-content:space-between`