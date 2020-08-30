import styled from 'styled-components/native'
import { Metrics, Colors } from 'Theme';

const HEADER_MAX_HEIGHT = 200;

export const ItemSelectedContainer = styled.ScrollView`
background-color:${Colors.gray200};
flex:1;
`

export const ItemImageContainer = styled.View`
top: 0;
left: 0;
right: 0;
background-color: ${Colors.white};
justify-content:center;
height: ${HEADER_MAX_HEIGHT}px;
`

export const ItemImage = styled.Image`
top: 0;
left: 0;
right: 0;
width: null;
height: ${HEADER_MAX_HEIGHT / 2 }px;
resizeMode: contain;
`

export const ButtonContainer = styled.View`
margin-horizontal:${Metrics.baseMargin}px
margin-bottom:${Metrics.smallMargin}px
`

export const ButtonsDiv = styled.View`
`

export const Content = styled.View`
border-radius: 20px;
height:65%;
background-color:${Colors.white};
margin-vertical:${Metrics.smallMargin}px;
margin-horizontal:${Metrics.baseMargin}px;
justify-content: space-between
`

export const ItemContainer = styled.View`
width:100%;
align-items:center;
justify-content:center;
`

export const Title = styled.Text`
text-align:center;
color:${Colors.gray}
font-size:16px;`