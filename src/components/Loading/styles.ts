import styled from 'styled-components/native';
import {Metrics} from 'Theme';

export const ModalTitle = styled.Text`
  text-align: center;
  font-size:18px;
  font-weight:bold;
  margin-bottom:${Metrics.mediumMargin}px;
`;
export const ModalDescription = styled.Text`
  text-align: center;
  font-size:18px;
  margin-bottom:${Metrics.mediumMargin}px;
`;
export const ModalContent = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;
export const ModalContainer = styled.View`
  background-color: #fff;
  height: 25%;
  width: 50%;
  margin: 0 auto;
  top: 40%;
  border-radius: 25px;
  padding-vertical: ${Metrics.baseMargin}px;
  padding-horizontal: ${Metrics.baseMargin}px;
  align-items:center;
  justify-content:center;
`;
export const ModalMessageContainer = styled.View``;
export const ModalActionsContainer = styled.View``;
