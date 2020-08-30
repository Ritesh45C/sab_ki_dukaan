import styled from 'styled-components/native';
import {Metrics, Colors} from 'Theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.gray200};
`;
export const PaymentDetails = styled.View`

margin-vertical: ${Metrics.baseMargin}px;
margin-horizontal: ${Metrics.baseMargin}px;
  padding-vertical: ${Metrics.baseMargin}px;
  padding-horizontal: ${Metrics.baseMargin}px;
  background-color: ${Colors.white};
  border-radius: 10px;
  margin-vertical: ${Metrics.smallMargin}px;
`;
export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: ${Metrics.baseMargin}px;
`;
export const Detail = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: ${Metrics.smallMargin}px;
`;
export const DetailTitle = styled.Text`
font-size:16px;
color:${Colors.gray}
font-weight:bold;
`;
export const DetailValue = styled.Text`
font-size:16px;
color:${Colors.gray}

`;
export const AddressDetails = styled.View`
margin-vertical: ${Metrics.baseMargin}px;
margin-horizontal: ${Metrics.baseMargin}px;
  padding-vertical: ${Metrics.baseMargin}px;
  padding-horizontal: ${Metrics.baseMargin}px;
  background-color: ${Colors.white};
  border-radius: 10px;
  margin-vertical: ${Metrics.smallMargin}px;
`;
export const Divider = styled.View`
  border-bottom-width: 1px;
  opacity: 0.5;
  margin-vertical:${Metrics.smallMargin}px;
`;
export const AddressDetail = styled.Text``;

export const ButtonContainer = styled.View`
padding-horizontal: ${Metrics.baseMargin}px
padding-vertical: ${Metrics.baseMargin}px;
`;
