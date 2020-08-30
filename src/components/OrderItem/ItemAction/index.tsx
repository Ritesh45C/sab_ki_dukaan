import React from 'react';
import {View} from 'react-native';
import {UnitsContainer, Units, Container} from './styles';
import CustomButton from 'components/CustomButton';
import {useDispatch} from 'react-redux';
import {addSubUnit} from 'redux/actions/cartActions';
import IconButton from 'components/IconButton';
import { Metrics, Colors } from 'Theme';
const ItemAction = (props: any) => {

  
  const {units, product_id} = props.data;
  const dispatch = useDispatch();
  const SubUnit = () => dispatch(addSubUnit(product_id, "SUB"))
  const AddUnit = () => dispatch(addSubUnit(product_id, "ADD"))
  return (
    <Container>
      <IconButton onPress={SubUnit} name="minus-box" size={32} color={Colors.primary} />
      <UnitsContainer>
        <Units>{units}</Units>
      </UnitsContainer>
      <IconButton onPress={AddUnit} name="plus-box" size={32} color={Colors.primary} />
    </Container>
  );
};

export default ItemAction;
