import styled from 'styled-components/native'; 
import {Metrics, Colors} from 'Theme'
import {Dimensions} from 'react-native'
const { width: screenWidth } = Dimensions.get('window')

export const Container = styled.View`
width:100%;
height:380px;
background-color:${Colors.grayLight};
padding-horizontal:${Metrics.smallMargin}px;
border-radius: 20px;
`
export const ActionContainer = styled.View`
margin-vertical:${Metrics.largeMargin}px;
margin-horizontal:${Metrics.smallMargin}px;
flex-direction:row;
justify-content:space-between;
align-items:center;
`

export const ButtonContainer = styled.View`
width:100px
`
export const DetailContainer = styled.View`
margin-vertical:32px;
`
export const BundleContainer = styled.View`
height:170px;
flex-direction:row;
margin: 0 auto;
align-items:center;
justify-content:space-between;

`
export const ItemContainer = styled.View`
background-color:#fff;
border-radius:5px;
width:${screenWidth *0.25}px;
height:100%;
margin:0 auto;
justify-content: space-between;
padding-vertical:${Metrics.mediumMargin}px;
padding-horizontal:${Metrics.smallMargin}px;
text-align:left;
`

export const BundleTitle = styled.Text`
font-size:16px;
font-weight:bold;
text-align:center;`

export const BundleDescription = styled.Text`
font-size:16px;
text-align:center;`

export const Title = styled.Text`
font-size:16px;
font-weight:bold;
`
export const Quantity = styled.Text`
font-size:14px;

`

export const Price = styled.Text`
font-size:14px;
`

export const ItemPriceDetail = styled.Text`
font-size:14px;

color:${Colors.gray};
`
export const ItemDiscountDetail = styled.Text`
font-size:14px;
color:#3AB23A;
margin-left:${Metrics.smallMargin}px
`
export const ItemPreviousPrice = styled.Text`
font-size:14px;
color:#6D6C6C;
margin-left:${Metrics.smallMargin}px;
text-decoration-line: line-through`

