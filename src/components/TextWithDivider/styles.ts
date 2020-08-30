import styled from "styled-components/native";
import { Colors, Metrics } from "Theme";

export const TextWithDividerContainer = styled.View`
flex-direction:row;
justify-content:space-between;
align-items:center;
`

export const Text = styled.Text`
color:${Colors.gray};
font-size:16px;
font-weight:bold;`

export const Divider = styled.View`
background-color:${Colors.grayLight};
height:5%;
width:50%;
margin-vertical:${Metrics.baseMargin};
margin-horizontal:${Metrics.baseMargin};
`