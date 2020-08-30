import styled from 'styled-components/native'
import { Metrics } from 'Theme'

export const Container = styled.View`
flex:1
padding-vertical:${Metrics.baseMargin}px;
padding-horizontal:${Metrics.baseMargin}px;
`
export const LocationsContainer = styled.View`
flex-direction: row;
flex-wrap:wrap;
`
export const Title = styled.Text`
font-size:24px;
font-weight:bold;
margin-vertical:${Metrics.smallMargin}px;
`

export const SmallText = styled.Text`
font-size:14px;
margin-vertical:${Metrics.smallMargin}px;`