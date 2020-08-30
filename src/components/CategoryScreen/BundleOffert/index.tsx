import React from 'react';
import {
  Container,
  BundleContainer,
  BundleTitle,
  BundleDescription,
  DetailContainer,
  ActionContainer,
  ButtonContainer,
  ItemPriceDetail,
  ItemPreviousPrice,
  ItemDiscountDetail,
} from './styles';
import Item_Offert from './Item_offert';
import {Col, Grid} from 'react-native-easy-grid';
import {Button, Text} from 'native-base';
import {ProductType} from 'types/Products';
import CustomButton from 'components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from 'Theme/Colors';
import {keyGenerator} from 'utils/general';
import { useDispatch } from 'react-redux';
import { addProduct } from 'redux/actions/cartActions';
import ItemAction from 'components/OrderItem/ItemAction';
import {
  viewTextItemDiscountDetails,
  viewTextItemPreviousPrice,
  viewTextItemPriceDetails,
} from '../Functions/index';
import { View } from 'react-native';

interface BundleOffertProps {
  bundle:ProductType;
  itsInTheCart: boolean;
}

const BundleOffert = (props: BundleOffertProps) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <DetailContainer>
        <BundleTitle>{props.bundle.product_name}</BundleTitle>
        <BundleDescription>{props.bundle.bundle_details}</BundleDescription>
      </DetailContainer>
      <BundleContainer>
        <Grid>
          {props.bundle.items?.map((item,index) => {
            return (
              <Col key={props.bundle.product_id+index}>
                <Item_Offert {...item} />
              </Col>
            );
          })}
        </Grid>
      </BundleContainer>

      <ActionContainer>
        <View style={{flexDirection: 'row'}}>
            <ItemPriceDetail>{`${viewTextItemPriceDetails(props.bundle)}`}</ItemPriceDetail>
            <ItemPreviousPrice>{`${viewTextItemPreviousPrice(props.bundle)}`}</ItemPreviousPrice>
            <ItemDiscountDetail>{`${viewTextItemDiscountDetails(props.bundle)}`}</ItemDiscountDetail>
          </View>
        <ButtonContainer>
        {props.itsInTheCart == false ? (
          <CustomButton
            iconLeft
            setIcon={<Icon name="add" size={16} color={Colors.primary} />}
            bordered
            text="Add"
            onPress={() => {
              dispatch(addProduct(props.bundle));
              //setSelected(true);
              // NavigationService.navigate('ItemSelectedScreen', {...props});
            }}
          />
        ) : (
          <ItemAction data={props.bundle} />
        )}
        </ButtonContainer>
      </ActionContainer>
    </Container>
  );
};

export default BundleOffert;
