import styled from 'styled-components/native'; 
import { Metrics } from 'Theme';

export const Container = styled.View`
width:100%;
height:128px;
background-color:#fff;
flex-direction:row;
justify-content:space-between;
align-items:center;
padding-horizontal:${Metrics.smallMargin}px;
`

export const ItemDetails = styled.View`
margin:${Metrics.smallMargin}px
`
export const ItemActions = styled.View`
margin:${Metrics.smallMargin}px;
width:100px;
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
export const ItemAvailable = styled.Text`
font-size:14px;
font-weight:bold;
color:#6D6C6C;
`

export const ItemImage = styled.View`
margin-left:${Metrics.baseMargin}px
`
export const ItemUnits = styled.Text`
text-align:center;
`

