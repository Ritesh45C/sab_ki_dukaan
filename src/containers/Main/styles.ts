import {Colors, AppStyles } from 'Theme'
import styled from 'styled-components/native'; 

export const Container = styled.View`
${{...AppStyles.ScreenStyles.container}};
background-color: ${Colors.defaultBackground}
`;

export const Scroll = styled.ScrollView`
flex:1;
`;

