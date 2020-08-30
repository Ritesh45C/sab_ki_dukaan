import styled from 'styled-components/native'
import { Metrics } from 'Theme'

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
borderRadius:5px;
backgroundColor:#EFEFEF;
`

export const ResultContainer = styled.View`
width: 100%;
paddingVertical: ${Metrics.baseMargin}px;
paddingHorizontal: ${Metrics.baseMargin}px;
borderBottomWidth:1px;
borderColor:rgba(0,0,0,0.1);
`

export const ResultName = styled.Text`
fontWeight:bold;
marginVertical:${Metrics.smallMargin}px
`
export const ResultAddress = styled.Text`
`