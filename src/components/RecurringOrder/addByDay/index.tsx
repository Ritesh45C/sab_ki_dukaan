import React from 'react';
import {
  AddByDayContainer,
  UnitsContainer,
  Units,
  DayText,
  ActionContent,
} from './styles';
import IconButton from 'components/IconButton';
import {Colors} from 'Theme';

interface AddByDay {
  SubUnit: () => void;
  AddUnit: () => void;
  units: number;
  textDay: string;
}

const AddByDay = (props: AddByDay) => {
  const {SubUnit, AddUnit, units, textDay} = props;

  return (
    <AddByDayContainer>
      <DayText>{textDay}</DayText>
      <ActionContent>
        <IconButton
          onPress={AddUnit}
          name="plus"
          size={32}
          color={Colors.primary}
        />
        <UnitsContainer>
          <Units>{units}</Units>
        </UnitsContainer>
        <IconButton
          onPress={SubUnit}
          name="minus"
          size={32}
          color={Colors.primary}
        />
      </ActionContent>
    </AddByDayContainer>
  );
};

export default AddByDay;
