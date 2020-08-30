import styled from "styled-components/native";
import Colors from "Theme/Colors";
import { Metrics } from "Theme";


export const Container = styled.ScrollView`
flex:1;
`

export const BalanceContainer = styled.View`
width:100%;
height:170px;
background-color:${Colors.primary}
justify-content:center;`


export const BalanceTitle = styled.Text`
font-size:16px;
text-align:center;
color:${Colors.white}
`

export const BalanceValue = styled.Text`
font-size:24px;
text-align:center;
font-weight:bold;
color:${Colors.white}
`

export const ButtonContainer = styled.View`
margin-vertical:${Metrics.baseMargin}px;
margin-horizontal:${Metrics.baseMargin}px;
`

export const Title = styled.Text`
color:${Colors.gray}
font-size:18px;
font-weight:bold;
text-align:center;
margin-vertical:${Metrics.baseMargin}px;
`

export const InputContainer = styled.View`
height:52px;
margin-vertical: ${Metrics.baseMargin}px;
margin-horizontal:${Metrics.baseMargin}px;
`
export const ButtonsTopupContainer = styled.View`
align-items:center;
justify-content:center;
flex-direction:row;
flex-wrap:wrap;
margin-vertical: ${Metrics.baseMargin}px;
`
export const CustomButtonContainer = styled.View`
width: 22%;
margin-vertical: ${Metrics.baseMargin}px;
margin-left:5PX;
`

export const TextError = styled.Text`
text-align:center;
font-size:16px;
color:${Colors.error};
margin-bottom:${Metrics.baseMargin}px;
`