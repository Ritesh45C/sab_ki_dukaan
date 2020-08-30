import styled from 'styled-components/native';
import {Metrics, Colors} from 'Theme';

export const Container = styled.View`
  flex: 1;
`;
export const OrdersContainer = styled.View`
width:100%;
height:100%;
`
export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const OrderDetail = styled.View`
width:100%;
height:100%;
background-color:${Colors.primary}
align-items:center;
justify-content:center;
`
export const OrderDetailTitle = styled.Text`
  text-align: center;
  color: ${Colors.white};
  font-weight: bold;
`;
export const OrderDetailValue = styled.Text`
  color: ${Colors.white};
  text-align: center;
  font-weight: bold;
`;
export const ModalContain = styled.View`
flex: 1;
padding-horizontal: ${Metrics.baseMargin}px
padding-vertical: ${Metrics.baseMargin}px;
justify-content:center;
background-color:${Colors.white}
`;

export const ModalTitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color:${Colors.gray}
  margin-vertical: ${Metrics.largeMargin}px;

`;

export const ModalListText = styled.Text`
margin-left: ${Metrics.baseMargin}px;

`;

export const ButtonContainer = styled.View`
margin-top:${Metrics.largeMargin}px;
padding-horizontal: ${Metrics.baseMargin}px
padding-vertical: ${Metrics.baseMargin}px;
`;

export const EmptyCartTextContainer = styled.View`
  flex: 1;
  justify-content: center;
  margin-horizontal: ${Metrics.baseMargin}px;
`;
export const EmptyCartText = styled.Text`
  text-align: center;
  font-size:16px;
`;
