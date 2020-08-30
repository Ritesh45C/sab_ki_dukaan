import React, {useState, useEffect} from 'react';
import {
  Container,
  BalanceContainer,
  BalanceTitle,
  BalanceValue,
  Title,
  ButtonContainer,
  InputContainer,
  ButtonsTopupContainer,
  CustomButtonContainer,
  TextError,
} from './styles';
import CustomButton from 'components/CustomButton';
import {Input} from 'native-base';
import NavigationService from 'services/NavigationService';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import validator from 'validator';
import { ErrorHandler } from 'types/General';
import { noError, getOrderDetails } from 'utils/general';
import { connect } from 'react-redux';

interface ShoppingCreditsProps {
  Cart: any;
  navigation: any;
}

const options = [
  {
    key: '250',
    text: '₹ 250',
  },
  {
    key: '500',
    text: '₹ 500',
  },
  {
    key: '1000',
    text: '₹ 1000',
  },
  {
    key: '3000',
    text: '₹ 3000',
  },
];
const ShoppingCreditsScreen = (props: ShoppingCreditsProps) => {
  const [optionSelected, setOptionSelected] = useState('250');
  const [topupInput, setTopupInput] = useState('');
  const [topupBalance, setTopUpBalance] = useState("0");
  const [error, setError] = useState<ErrorHandler>({
    code:'ERR_EMPTY',
    error:false,
    error_message:{
      title:'',
      message:''
    }
  })
  useEffect(() => {
    setTopupInput(optionSelected)
    const user = auth().currentUser;
    if (user) {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .onSnapshot(function(doc) {
          const userData = doc.data();
          if (userData) {
            if(userData.shopping_credits){
              const balanceString: string = Number(userData.shopping_credits).toFixed(2);
            
              setTopUpBalance(balanceString);
            }
     
          }
        });
    }
  }, []);

  const handleOnChangeTextInput = (value: string) => {
    if(validator.isFloat(value)) setError(noError());
    else setError({
      code:'ERR_IS_NOT_FLOAT',
      error:true,
      error_message:{
        title:'',
        message:'Please enter a valid amount.'
      }
    })

    setTopupInput(value);
    setOptionSelected('');
  };
  const handleOnSelectOption = (option: string) => {
    setOptionSelected(option);
    setTopupInput(option);
  };
  
  const onClickPay = () => {
    if(validator.isFloat(topupInput)){
      NavigationService.navigate('PaymentScreen', {
        type: 'topUpAccount',
        topupValue: topupInput,
      });
      setTopupInput('');
      setError(noError());
    }else{
      setError({
        code:'ERR_IS_NOT_FLOAT',
        error:true,
        error_message:{
          title:'',
          message:'Please enter a valid amount.'
        }
      })
    }
  }

  const {Cart} = props;
  useEffect(() => {
    const Details = getOrderDetails(Cart.cartProducts);
    props.navigation.setParams({
      itemsCart: Details.Items,
    });
  }, [props.Cart]);

  
  return (
    <Container>
      <BalanceContainer>
        <BalanceTitle>Your Balance</BalanceTitle>
        <BalanceValue>₹ {`${topupBalance}`}</BalanceValue>
      </BalanceContainer>
      <Title>Topup your account</Title>
      <InputContainer>
        <Input
          keyboardType="decimal-pad"
          onChangeText={handleOnChangeTextInput}
          style={{textAlign: 'center', fontSize: 24, borderBottomWidth: 1}}
          placeholder="₹ 0,00"
          maxLength={7}
          value={topupInput}
        />
      </InputContainer>
      <ButtonsTopupContainer>
        {options.map(option => (
          <CustomButtonContainer>
            <CustomButton
              textStyle={{fontSize: 12}}
              primary={optionSelected === option.key && true}
              onPress={() => {
                handleOnSelectOption(option.key);
              }}
              text={option.text}
              bordered
            />
          </CustomButtonContainer>
        ))}
      </ButtonsTopupContainer>
      <ButtonContainer>
        {
          error.error&&
          <TextError>
          {error.error_message.message}
          </TextError>
        }
      
        <CustomButton
          primary
          onPress={onClickPay}
          text="Topup"
        />
      </ButtonContainer>
    </Container>
  );
};

const mapStateToProps = (reducers: any) => {
  return {Cart:reducers.cart}
}
export default connect(mapStateToProps)(ShoppingCreditsScreen);
