import styled from "styled-components/native";
import { Metrics, Colors } from "Theme";

export const Container = styled.View`
flex: 1;
`

export const EmptyTextContainer = styled.View`
  flex: 1;
  justify-content: center;
  margin-horizontal: ${Metrics.baseMargin}px;
`;
export const EmptyText = styled.Text`
  text-align: center;
  font-size:16px;
`;
