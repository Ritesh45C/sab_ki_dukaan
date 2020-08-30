import styled from 'styled-components/native';
import {Colors, Metrics} from 'Theme';

export const AddByDayContainer = styled.View`
  justify-content: space-between;
  align-items:center;
  margin-vertical:${Metrics.baseMargin}px
  width:38px;
`;

export const UnitsContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
export const Units = styled.Text`
  color: ${Colors.gray};
  font-size: 18px;
  text-align: center;
`;

export const DayText = styled.Text``;

export const ActionContent = styled.View`
border-width: 2px;
border-color:${Colors.primary}
border-radius:5px;
margin-vertical:${Metrics.baseMargin}px`