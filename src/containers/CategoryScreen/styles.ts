import {Colors, AppStyles} from 'Theme'

import styled from 'styled-components/native'; 

import {Dimensions} from 'react-native'

const { width: screenWidth } = Dimensions.get('window')


export const Container = styled.View`
flex:1;
background-color: transparent;
`;


export const Offert = styled.View`
background-color: #D6D6D6;
width: ${(screenWidth-32).toFixed(0)}px;
height: ${(screenWidth-200).toFixed(0)}px;
border-radius: 10px;
margin: 10px auto;
position:relative;
`;