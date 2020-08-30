import styled from "styled-components/native";
import { Metrics, Colors } from "Theme";


export const Container = styled.View`
flex:1;
background-color:#fff
justify-content:space-between`

export const InviteImage = styled.Image`
width:100%;
height:35%;
background-color:#000;
`



export const ButtonContainer = styled.View`
margin-vertical:${Metrics.baseMargin}px;
margin-horizontal:${Metrics.baseMargin}px;
`

export const InviteContainer = styled.View`
margin-vertical:${Metrics.baseMargin}px;
margin-horizontal:${Metrics.baseMargin}px;
`

export const InviteCodeContent = styled.View`
border-width:3px;
width:50%;
margin:0 auto;
padding:${Metrics.smallMargin}px;
`

export const InviteCodeContainer = styled.View`
margin-vertical:${Metrics.baseMargin}px;
flex-direction:row;
`

export const InviteCode = styled.Text`
text-align:center;
font-size:16px;
`

export const InviteTitle = styled.Text`
font-size:20px;
text-align:center;
font-weight:bold;
`

export const InviteDescription = styled.Text`
font-size:18px;
margin-vertical:${Metrics.baseMargin}px
text-align:center;
color:${Colors.gray}`

export const ButtonCopyContainer = styled.View`
width:30%
`