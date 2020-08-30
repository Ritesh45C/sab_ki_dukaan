import React, {useState} from 'react';
import {
  Container,
  OrderDetailTitle,
  OrderDetailValue,
  ModalContain,
  ModalTitleText,
  ModalListText,
  ButtonContainer,
  EmptyCartText,
  EmptyCartTextContainer,
} from './styles';
import {List, ListItem, Left, Right} from 'native-base';
import {Row, Grid, Col} from 'react-native-easy-grid';
import {ProductType} from 'types/Products';
import {connect} from 'react-redux';
import {
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet
} from 'react-native';
import {Colors, Metrics} from 'Theme';
import CustomButton from 'components/CustomButton';
import NavigationService from 'services/NavigationService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {getOrderDetails} from 'utils/general';
import Item from 'components/CategoryScreen/Item';
import {AppStyles} from 'Theme';
interface CartProps {
  cartData: Array<ProductType>;
  cartProducts: Array<ProductType>;
}

interface ModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
}

const PaymentMethodModal = (props: ModalProps) => {
  const {isModalVisible, toggleModal} = props;
  const user = auth().currentUser;
  const onSelectCOD = () => {
    toggleModal();
    NavigationService.navigate('PersonalInfoScreen', {
      method: 'COD',
    });
  }
  const onSelectCard = () => {
    toggleModal();
    NavigationService.navigate('PersonalInfoScreen', {
      method: 'CARD',
    });
  }
  const onSelectWallet = () => {
    toggleModal();
    NavigationService.navigate('PersonalInfoScreen', {
      method: 'WALLET',
    });
  }
  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <ModalContain>
        <ModalTitleText>Select Payment Method</ModalTitleText>
        <List>
          <ListItem noIndent>
            <Left style={paymentMethodStyles.leftStyles}>
            <Icon name="cash" size={24} />
              <ModalListText>Cash on delivery</ModalListText>
            </Left>
            <Right>
              <TouchableOpacity
                onPress={onSelectCOD}>
                <Icon name="arrow-right" size={24} />
              </TouchableOpacity>
            </Right>
          </ListItem>
          <ListItem noIndent>
          <Left style={paymentMethodStyles.leftStyles}>
            <Icon name="credit-card" size={24} />
              <ModalListText>Credits and Debits cards</ModalListText>
            </Left>
            <Right>
              <TouchableOpacity
                onPress={onSelectCard}>
                <Icon name="arrow-right" size={24} />
              </TouchableOpacity>
            </Right>
          </ListItem>
          {user&&
          !user.isAnonymous&&
          <ListItem noIndent>
          <Left style={paymentMethodStyles.leftStyles}>
            <Icon name="wallet-outline" size={24} />
              <ModalListText>Pay with my wallet</ModalListText>
            </Left>
            <Right>
              <TouchableOpacity
                onPress={onSelectWallet}>
                <Icon name="arrow-right" size={24} />
              </TouchableOpacity>
            </Right>
          </ListItem>
          }
        
        </List>
        <ButtonContainer>
          <CustomButton onPress={toggleModal} primary text="Close" />
        </ButtonContainer>
      </ModalContain>
    </Modal>
  );
};
const paymentMethodStyles = StyleSheet.create({
  leftStyles:{
    alignItems:'center',
    
  }
})
const CartScreen = (props: CartProps) => {
  /*const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartData(props.cartProducts));
  }, []);*/

  const Details = getOrderDetails(props.cartProducts);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  if (props.cartProducts.length == 0) {
  }
  return (
    <Container>
      {props.cartProducts.length !== 0 && (
        <PaymentMethodModal
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
        />
      )}

      {props.cartProducts.length !== 0 ? (
        <React.Fragment>
          <Grid>
            <Row size={12}>
              <FlatList
                contentContainerStyle={{
                  ...AppStyles.FlatListStyles.FlatListContent,
                }}
                keyExtractor={item => item.product_id}
                showsVerticalScrollIndicator={false}
                data={props.cartProducts}
                renderItem={({item, index}) => {
                  return <Item itsInTheCart={true} key={index} item={item} />;
                }}
              />
            </Row>
            <ButtonContainer>
              <CustomButton onPress={toggleModal} primary text="Checkout" />
            </ButtonContainer>

            <Row
              style={{
                height: 50,
                backgroundColor: Colors.primary,
                alignItems: 'center',
              }}>
              <Col>
                <OrderDetailTitle>Items</OrderDetailTitle>
                <OrderDetailValue>{Details.Items}</OrderDetailValue>
              </Col>
              <Col>
                <OrderDetailTitle>Savings</OrderDetailTitle>
                <OrderDetailValue>{`₹ ${Details.Savings}`}</OrderDetailValue>
              </Col>
              <Col>
                <OrderDetailTitle>Total</OrderDetailTitle>
                <OrderDetailValue>{`₹ ${Details.Total}`}</OrderDetailValue>
              </Col>
            </Row>
          </Grid>
        </React.Fragment>
      ) : (
        <EmptyCartTextContainer>
          <EmptyCartText>
            You have no products in your shopping cart, browse through the
            categories and add a product.
          </EmptyCartText>
        </EmptyCartTextContainer>
      )}
    </Container>
  );
};
const mapStateToProps = (reducers: any) => {
  return reducers.cart;
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default connect(mapStateToProps)(CartScreen);

/*

*/
