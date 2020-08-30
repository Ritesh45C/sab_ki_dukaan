import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-input-credit-card';
import CustomButton from 'components/CustomButton';
import functions from '@react-native-firebase/functions';
// @ts-ignore
import {connect} from 'react-redux';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import ModalSingleton from 'containers/ModalSingleton';
import NavigationService from 'services/NavigationService';
import {ErrorHandler} from 'types/General';
import {Metrics, Colors} from 'Theme';
import {Text} from 'react-native';
import StripeService from 'services/StripeService';


interface ChargeCustomerCardByOrderResponse {
server_response:{
  paid:boolean;
  status:string;
}
server_error:ErrorHandler
}

const PaymentScreen = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [apiError, setApiError] = useState<ErrorHandler>({
    code: 'ERR_EMPTY',
    error: false,
    error_message: {title: '', message: ''},
  });
  const {orderId, type, topupValue} = props.route.params;

  const _onChange = (value: any) => {
    setValue(value);
  };
  const ChargeCustomerTopupAccount = async () => {
    setIsLoading(true);
    const user = auth().currentUser;
    if(user){
      //@ts-ignore
      const {cvc, expiry, number, type} = value.values;
      const expirySplited = expiry.split('/');
      const params = {
        number: number,
        expMonth: Number(expirySplited[0]),
        expYear: Number(expirySplited[1]),
        cvc: cvc,
        currency: 'inr',
        addressCity: 'Dehradun',
        addressState: 'Uttarakhand',
        addressCountry: 'India',
        addressZip: '248001',
      };
      try{
        const paymentDataResult :any = await StripeService.createTokenFetch(params)
        const Data = {
          topupValue: parseFloat(topupValue).toFixed(2),
          userId: user.uid,
          paymentData: {
            ...paymentDataResult,
            currency: 'inr'
          },
        };

        const serverResponse = await functions().httpsCallable('ChargeCustomerTopupAccount')(Data);
        const response: ChargeCustomerCardByOrderResponse  = serverResponse.data;
      
        if(response.server_response){
          if(response.server_response.status == "succeeded" && response.server_response.paid){
            setApiError({
              code:'NO_ERROR',
              error:false,
              error_message:{
                title:"",
                message:""
              }
            })
          }else{
            setApiError({
              code:'ERR_NOT_PAID_OUT',
              error:true,
              error_message:{
                title:"Error processing payment.",
                message:"An error has occurred, check your credit or debit card and try again."
              }
            })
          }

        }else if(response.server_error){
          setApiError({
            code:response.server_error.code,
            error:response.server_error.error,
            error_message:{
              title:response.server_error.error_message.title,
              message:response.server_error.error_message.message
            }
          })
        }
        setIsLoading(false);
        ModalSingleton.singletonRef.toggle();
    }catch(error){
     console.log(error)
    }
    setIsLoading(false);
  }
}
  const ChargeCustomerCardByOrder = async () => {
    setIsLoading(true);
    const user = auth().currentUser;
    if (user) {
      //@ts-ignore
      const {cvc, expiry, number, type} = value.values;
      const expirySplited = expiry.split('/');
      const params = {
        number: number,
        expMonth: Number(expirySplited[0]),
        expYear: Number(expirySplited[1]),
        cvc: cvc,
        currency: 'inr',
        addressCity: 'Dehradun',
        addressState: 'Uttarakhand',
        addressCountry: 'India',
        addressZip: '248001',
      };
      try{
        const paymentDataResult :any = await StripeService.createTokenFetch(params)

        const Data = {
          orderId: orderId,
          userId: user.uid,
          paymentData: {
            ...paymentDataResult,
            currency: 'inr'
          },
        }; 
        const serverResponse = await functions().httpsCallable('ChargeCustomerCardByOrder')(Data);
    

        const response: ChargeCustomerCardByOrderResponse  = serverResponse.data;
     
        if(response.server_response){
          if(response.server_response.status == "succeeded" && response.server_response.paid){
            setApiError({
              code:'NO_ERROR',
              error:false,
              error_message:{
                title:"",
                message:""
              }
            })
          }else{
            setApiError({
              code:'ERR_NOT_PAID_OUT',
              error:true,
              error_message:{
                title:"Error processing payment.",
                message:"An error has occurred, check your credit or debit card and try again."
              }
            })
          }

        }else if(response.server_error){
          setApiError({
            code:response.server_error.code,
            error:response.server_error.error,
            error_message:{
              title:response.server_error.error_message.title,
              message:response.server_error.error_message.message
            }
          })
        }
        setIsLoading(false);
        ModalSingleton.singletonRef.toggle();

      }catch(error){
        
        console.error(JSON.stringify(error))

        setApiError({
          code:'ERR_GENERAL',
          error:true,
          error_message:{
            title:"Error processing payment.",
            message:"An error has occurred, check your credit or debit card and try again."
          }
        })
        ModalSingleton.singletonRef.toggle();
        setIsLoading(false);
      }
    }
    
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.white,
      }}>
      {apiError.error ? (
        <ModalSingleton
          title={apiError.error_message.title}
          description={apiError.error_message.message}
          renderActionsContainer={
            <CustomButton
              text="CLOSE"
              onPress={() => {
                ModalSingleton.singletonRef.toggle();
              }}
              primary
            />
          }
        />
      ) : (
        <ModalSingleton
          title="Your payment has been successful."
          description="The payment of your order has been processed, our team will contact you."
          renderActionsContainer={
            <CustomButton
              text="Ok"
              onPress={() => {
                ModalSingleton.singletonRef.toggle();
                if(type=='topUpAccount'){
                  NavigationService.navigateToShoppingCredits()
                }
                else if(type=='payorder'){
                  NavigationService.navigate('Home',{})
                }else if(type=='orderPaymentSelected'){
                  NavigationService.navigate('Home',{})
                }
              }}
              primary
            />
          }
        />
      )}

      <Text
        style={{
          textAlign: 'center',
          marginHorizontal: Metrics.largeMargin,
          marginVertical: Metrics.largeMargin,
          fontSize: 16,
          fontWeight: 'bold',
          color: Colors.gray,
        }}>
        Enter your card details, don't worry, we don't store the data.
      </Text>
      <CreditCardInput onChange={_onChange} />
      <View style={{marginHorizontal: Metrics.baseMargin}}>
        <CustomButton isLoading={isLoading} text="pay" onPress={type=='topUpAccount'?ChargeCustomerTopupAccount:ChargeCustomerCardByOrder} primary />
      </View>
    </View>
  );
};

const mapStateToProps = (reducers: any) => {
  return {personal_info: reducers.personal_info, cart: reducers.cart};
};

export default connect(mapStateToProps)(PaymentScreen);
