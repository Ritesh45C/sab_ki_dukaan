import React, {useState, useEffect} from 'react';
import {
  ItemImageContainer,
  ItemImage,
  ButtonContainer,
  ButtonsDiv,
  Content,
  ItemSelectedContainer,
  ItemContainer,
  Title,
} from './styles';
import {Images, Metrics, AppStyles} from 'Theme';
import {Grid, Row, Col} from 'react-native-easy-grid';
import Category from 'components/MainScreen/Category';
import {Button, Text} from 'native-base';
import {ProductType} from 'types/Products';
import CustomButton from 'components/CustomButton';
import {connect} from 'react-redux';
import {CategoriesType, CategoryType} from 'types/Categories';
import NavigationService from 'services/NavigationService';
import Item from 'components/CategoryScreen/Item';
import {checkIfItsInTheCart} from 'components/CategoryScreen/Functions';
import ModalSingleton from 'containers/ModalSingleton';
import auth from '@react-native-firebase/auth';

const ItemSelectedScreen = (props: any) => {
  const selectedItem: ProductType = props.route.params.selectedItem;
  const {cartProducts} = props.cart;
  let itsInTheCart: boolean = false;
  const result = checkIfItsInTheCart(selectedItem.product_id, cartProducts);
  if (result) {
    if (result.itsInTheCart) {
      itsInTheCart = true;
      selectedItem.units = result.Product.units;
    }
  }
  return (
    <ItemSelectedContainer contentContainerStyle={{flex:1}}>
      <ModalSingleton
        title="Hello Anonymous"
        description="To add recurring products, you must register in the application."
        renderActionsContainer={
          <CustomButton
            text="close"
            onPress={() => {
              ModalSingleton.singletonRef.toggle();
            }}
            primary
          />
        }
      />
      <ItemImageContainer>
        <ItemImage source={{uri: selectedItem.imgurl}} />
      </ItemImageContainer>
  
      <Content>
      <ItemContainer>
        <Item
          showImage={false}
          itsInTheCart={itsInTheCart}
          item={selectedItem}
        />
      </ItemContainer>
        <Title>
          Discovery more products
        </Title>
        <Category {...props.categories.subCategories} />
        <ButtonContainer>
          <CustomButton
            onPress={() => {
              const user = auth().currentUser;
              if (user) {
                if (user.isAnonymous) {
                  ModalSingleton.singletonRef.toggle();
                  return;
                }
              }
              NavigationService.navigate('RecurringProductScreen', {
                item: selectedItem,
              });
            }}
            primary
            text="RECURRING"
          />
        </ButtonContainer>
      </Content>
    </ItemSelectedContainer>
  );
};
const mapStateToProps = (reducers: any) => {
  return {categories: reducers.categories, cart: reducers.cart};
};

/*     <Category
            title_category={"Discover More Products"}
            sub_categories={data.sub_categories}
          /> */
export default connect(mapStateToProps)(ItemSelectedScreen);
