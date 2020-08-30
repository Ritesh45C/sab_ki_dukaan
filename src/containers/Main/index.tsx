import React, {useEffect, Component} from 'react';
import {Container, Scroll} from './styles';
import Offerts from 'components/Offerts';
import Categories from 'components/MainScreen/Categories';
import {connect, useDispatch, useSelector} from 'react-redux';
import {getOrderDetails} from 'utils/general';
import ModalSingleton from 'containers/ModalSingleton';
import {TouchableOpacity, Text} from 'react-native';
import CustomButton from 'components/CustomButton';
import {startup}  from 'redux/actions/startupActions';
import LoadingModalSingleton from 'components/Loading';
const Main = (props: any) => {


  const {cart, startupReducer} = props;
  useEffect(() => {
    const Details = getOrderDetails(props.cart.cartProducts);
    props.navigation.setParams({
      itemsCart: Details.Items,
    });
  }, [cart]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (startupReducer.startupErrorMessage) {
      if(!LoadingModalSingleton.singletonRef.props.visible){
          ModalSingleton.toggleModal();
      }
    }
  }, [startupReducer]);

  return (
    <Container>
      <ModalSingleton
        title="Unable to connect the server."
        description="Please check your internet connection."
        renderActionsContainer={
          <CustomButton
            isLoading={startupReducer.startupIsLoading}
            primary
            text="Retry"
            onPress={() => {
              dispatch(startup());
            }}
          />
        }
      />
      {props.categories.categoriesData !== null && (
        <Scroll showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
          <Offerts />
          <Categories categoriesData={props.categories.categoriesData} />
        </Scroll>
      )}
    </Container>
  );
};

const mapStateToProps = (reducers: any) => {
  return {categories: reducers.categories, cart: reducers.cart, startupReducer: reducers.startup};
};
export default connect(mapStateToProps)(Main);
