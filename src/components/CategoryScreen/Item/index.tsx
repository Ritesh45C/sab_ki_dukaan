import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {
  ItemDetails,
  ItemTitle,
  ItemSubTitle,
  ItemActions,
  TouchableContainer,
  ItemPriceDetail,
  ItemDiscountDetail,
  ItemPreviousPrice,
  ImageAndProductDetailsContainer,
  ItemPriceDetailsContainer,
  ItemUnits,
} from './styles';

import {Images, Colors} from 'Theme';
import NavigationService from 'services/NavigationService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ProductType} from 'types/Products';
import CustomButton from 'components/CustomButton';
import ItemAction from 'components/OrderItem/ItemAction';

import {addProduct} from 'redux/actions/cartActions';
import {useDispatch, connect} from 'react-redux';

import {
  viewTextItemDiscountDetails,
  viewTextItemPreviousPrice,
  viewTextItemPriceDetails,
} from '../Functions/index';
import {Grid} from 'react-native-easy-grid';
import {Col} from 'native-base';

interface ItemProps {
  itsInTheCart?: boolean;
  item: ProductType;
  showImage?: boolean;
  showUnits?: boolean;
  showEditButton?: boolean;
  enableRecurring: boolean;
}

const Item = (props: ItemProps) => {
  const dispatch = useDispatch();
  const renderButtonAction = () => {
    if (props.showUnits) {
      return <ItemUnits>{props.item.units} UNITS</ItemUnits>;
    }
    if (props.showEditButton) {
      return (
        <CustomButton
          iconLeft
          setIcon={<Icon name="edit" color={Colors.primary} size={16} />}
          bordered
          text="EDIT"
          onPress={() => {
            NavigationService.navigate('RecurringProductScreen', {
              item: props.item,
            });
          }}
        />
      );
    }
    if (!props.itsInTheCart) {
      return (
        <CustomButton
          iconLeft
          setIcon={<Icon name="add" size={16} color={Colors.primary} />}
          bordered
          text="Add"
          onPress={() => {
            dispatch(addProduct(props.item));
          }}
        />
      );
    }
    if (props.itsInTheCart) {
      return <ItemAction data={props.item} />;
    }
  };
  return (
    <TouchableContainer
      onPress={() => {
        if (props.enableRecurring) {
          NavigationService.navigate('ItemSelectedScreen', {
            selectedItem: props.item,
          });
        }
      }}>
      <Grid style={{ alignItems:"center"}}>
        <Col >
          <ImageAndProductDetailsContainer>
            {props.showImage && (
              <Image
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: 'contain',
                }}
                source={{uri: props.item.imgurl}}
              />
            )}

            <ItemDetails>
              <ItemTitle>{props.item.product_name}</ItemTitle>
              <ItemSubTitle>{`${props.item.product_details}`}</ItemSubTitle>

              <ItemPriceDetailsContainer>
                <ItemPriceDetail>{`${viewTextItemPriceDetails(
                  props.item,
                )}`}</ItemPriceDetail>
                <ItemPreviousPrice>{`${viewTextItemPreviousPrice(
                  props.item,
                )}`}</ItemPreviousPrice>
                <ItemDiscountDetail>{`${viewTextItemDiscountDetails(
                  props.item,
                )}`}</ItemDiscountDetail>
              </ItemPriceDetailsContainer>
            </ItemDetails>
          </ImageAndProductDetailsContainer>
        </Col>
        <Col style={{alignItems:"flex-end"}}>
          <ItemActions>{renderButtonAction()}</ItemActions>
        </Col>
      </Grid>
    </TouchableContainer>
  );
};

Item.defaultProps = {
  showImage: true,
  itsInTheCart: false,
  showEditButton: false,
  showUnits: false,
  enableRecurring: true,
};
const mapStateToProps = (reducers: any) => {
  return reducers.cart;
};
export default connect(mapStateToProps)(Item);
