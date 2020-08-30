import styled from 'styled-components/native'
import { Metrics } from 'Theme'

export const Container = styled.View`
flex:1
`
export const Title = styled.Text`
`

export const LogoContainer = styled.View`
align-items: center;
justify-content: center;
width: 100%
`

export const Logo = styled.ImageBackground`
width: 140px;
height: 140px; 
border-radius: 200px;
`

export const ButtonsContainer = styled.View`
margin-horizontal: ${Metrics.baseMargin}px;
width: 90%;
justify-content: space-between;
align-items: center;
`