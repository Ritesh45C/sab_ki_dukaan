import styled from 'styled-components/native'
import { Metrics, Colors } from 'Theme'

export const Container = styled.View`
flex:1
background-color:${Colors.gray200}
`
export const LocationsContainer = styled.View`
flex-direction: row;
flex-wrap:wrap;

padding-vertical:${Metrics.baseMargin}px;
padding-horizontal:${Metrics.baseMargin}px;
`
export const Title = styled.Text`
font-size:24px;
font-weight:bold;
margin-vertical:${Metrics.smallMargin}px;
margin-horizontal:${Metrics.baseMargin}px;
color:${Colors.gray}
`

export const SmallText = styled.Text`
font-size:14px;
margin-vertical:${Metrics.smallMargin}px;`

export const InputContainer = styled.View`
width:100%;
justify-content:center;
align-items:center;
margin-vertical:${Metrics.baseMargin}px;

`
export const SearchInput = styled.TextInput`
height: 40px;
width: 90%;
padding: ${Metrics.smallMargin}px;
borderRadius:15px;
backgroundColor:${Colors.white};
`
