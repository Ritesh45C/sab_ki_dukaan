import styled from 'styled-components/native'; 
import { Metrics } from 'Theme';

export const Container = styled.View`
flex:1;
padding-vertical:${Metrics.baseMargin}px;
padding-horizontal:${Metrics.baseMargin}px;
background-color:#fff
`

export const Title = styled.Text`
max-width:50%;
font-size:18px;
font-weight:bold;
margin-vertical:${Metrics.baseMargin}px;
`
export const SubTitle = styled.Text`
max-width:50%;
font-size:12px;
font-weight:bold;
margin-bottom:${Metrics.baseMargin}px
`
export const InputsContainer = styled.View`
width:100%;
height:100%;
`

export const TextError = styled.Text`
color:red;
padding-vertical:${Metrics.baseMargin}px;
`