import styled from 'styled-components/native'; 
import { Metrics } from 'Theme';

export const Container = styled.View`
flex:1;
padding-vertical:${Metrics.baseMargin}px;
padding-horizontal:${Metrics.baseMargin}px;
background-color:#fff
`

export const Title = styled.Text`
font-size:18px;
font-weight:bold;
margin-vertical:${Metrics.baseMargin}px;
`
export const InputsContainer = styled.View`
width:100%;
height:100%;
`

export const TextErrorContainer = styled.View`
margin-vertical:${Metrics.baseMargin}px;
`

export const TextError = styled.Text`

color:red;
font-weight:bold;
text-align:center;
padding-vertical:${Metrics.baseMargin}px;
`