import React, {useState} from 'react';
import {
  Container,
  PaymentDetails,
  Title,
  Detail,
  DetailTitle,
  DetailValue,
  Divider,
  AddressDetails,
} from './styles';
import {Metrics} from 'Theme';
import {ScrollView, View} from 'react-native';
import {OrderData} from 'types/Orders';
import {connect, useDispatch} from 'react-redux';
import {ProductType} from 'types/Products';
import {getOrderDetails, noError} from 'utils/general';
import CustomButton from 'components/CustomButton';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {validatePersonalInfoForm} from 'utils/validations';
import FirebaseService from 'services/FirebaseService';
import {ErrorHandler} from 'types/General';
import ModalSingleton from 'containers/ModalSingleton';
import {emptyCart} from 'redux/actions/cartActions';
import NavigationService from 'services/NavigationService';
import functions from '@react-native-firebase/functions';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

// @ts-ignore
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

interface personalInfoTypes {
  step: string;
  name: string;
  lastname: string;
  mobile_number: string;
  houseno: string;
  apartment_name: string;
  street_details: string;
  landmark: string;
}
interface ConfirmOrderProps {
  route: {
    params: {
      method: string;
      orderId: string;
    };
  };
  cart: {
    cartProducts: ProductType[];
  };
  personal_info: personalInfoTypes;
}

interface Response {
  server_response: {paid_out: boolean; method: string};
  server_error: ErrorHandler;
}
const ConfirmOrderScreen = (props: ConfirmOrderProps) => {
  const {method} = props.route.params;
  const personal_info: personalInfoTypes = props.personal_info;
  const {cartProducts} = props.cart;
  const orderDetails = getOrderDetails(cartProducts);
  // Hook's States
  const [isLoading, setIsLoading] = useState(false);
  const [itsPaying, setItsPaying] = useState(false);
  const [orderId, setOrderId] = useState<string | ErrorHandler | null>(null);
  const [apiError, setApiError] = useState<ErrorHandler>({
    code: 'ERR_EMPTY',
    error: false,
    error_message: {title: '', message: ''},
  });

  const dispatch = useDispatch();
  const onContinue = async () => {
    setIsLoading(true);
    try {
      // cart, personal_info, method
      const getOrderId = await FirebaseService.AddOrderData(
        personal_info,
        cartProducts,
        method,
      );
      dispatch(emptyCart());
      setApiError(noError());
      ModalSingleton.singletonRef.toggle();
      setOrderId(getOrderId);

      return;
    } catch (error) {
      console.warn(error);
      setApiError(error);
      ModalSingleton.singletonRef.toggle();
      setIsLoading(false);
      return;
    }
  };
  const onPaymentIsCard = () => {
    NavigationService.navigate('PaymentScreen', {
      method: 'CARD',
      orderId: orderId,
      type: 'payorder',
    });
    ModalSingleton.singletonRef.toggle();
  };

  const onPaymentIsCOD = () => {
    NavigationService.navigate('Home', {});
    ModalSingleton.singletonRef.toggle();
  };

  const onPaymentIsWallet = async () => {
    ModalSingleton.singletonRef.toggle();
    const user = auth().currentUser;
    if (user) {
      setItsPaying(true);
      const Data = {
        userId: user.uid,
        orderId: orderId,
      };
      try {
        const response = await functions().httpsCallable(
          'ChargeCustomerWallet',
        )(Data);
        const responseData: Response = response.data;
        if (responseData.server_response) {
          setApiError(noError());
          NavigationService.navigate('Home', {});
        } else if (responseData.server_error) {
          setApiError(responseData.server_error);
        }
      } catch (error) {
        setApiError({
          code: 'ERR_GENERAL',
          error: true,
          error_message: {title: '', message: ''},
        });
      }
      setItsPaying(false);
      ModalSingleton.singletonRef.toggle();
    }
  };

  const promptForEnableLocationIfNeeded = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data: any) => {
        ModalSingleton.singletonRef.toggle();
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
      })
      .catch((err: any) => {
        ModalSingleton.singletonRef.toggle();
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
        // codes :
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
      });
  };
  const renderCustomButtonModal = () => {
    switch (method) {
      case 'COD':
        return (
          <CustomButton text={'FINISH'} onPress={onPaymentIsCOD} primary />
        );
      case 'CARD':
        return (
          <CustomButton text={'CONTINUE'} onPress={onPaymentIsCard} primary />
        );
      case 'WALLET':
        return (
          <React.Fragment>
            <CustomButton
              isLoading={itsPaying}
              text={'PAY'}
              onPress={onPaymentIsWallet}
              primary
            />
            <CustomButton
              text={'CANCEL'}
              onPress={() => ModalSingleton.singletonRef.toggle()}
              transparent
            />
          </React.Fragment>
        );
      default:
        return undefined;
    }
  };
  const getDescriptionModal = () => {
    switch (method) {
      case 'COD':
        return 'Our team will contact you.';
      case 'CARD':
        return 'Make the payment to complete the order.';
      case 'WALLET':
        return 'You have successfully shipped your order, we charge the cost of your order of your wallet.';
      default:
        return '';
    }
  };
  const renderActionsErrorModal = (code: string) => {
    if (code == '2') {
      return (
        <CustomButton
          text="Activate"
          onPress={promptForEnableLocationIfNeeded}
          primary
        />
      );
    } else if (code == 'ERR_PAYMENT_WALLET_001') {
      return (
        <React.Fragment>
          <CustomButton
            text="Topup"
            onPress={() => {
              NavigationService.navigateToShoppingCredits()
              ModalSingleton.singletonRef.toggle();
            }}
            primary
          />
          <CustomButton
            text="CLOSE"
            onPress={() => {
              NavigationService.navigate('Home', {});
              ModalSingleton.singletonRef.toggle();
            }}
            transparent
          />
        </React.Fragment>
      );
    }else{
      return<CustomButton
      text="CLOSE"
      onPress={() => {
        NavigationService.navigate('Home', {});
        ModalSingleton.singletonRef.toggle();
      }}
      transparent
    />
    }
  };

  return (
    <Container>
      {apiError.error ? (
        <ModalSingleton
          title={apiError.error_message.title}
          description={apiError.error_message.message}
          renderActionsContainer={renderActionsErrorModal(apiError.code)}
        />
      ) : (
        <ModalSingleton
          title="You have successfully placed your order."
          description={getDescriptionModal()}
          renderActionsContainer={renderCustomButtonModal()}
        />
      )}

      <ScrollView>
        <PaymentDetails>
          <Title>Payment Details</Title>
          <Detail>
            <DetailTitle>Type</DetailTitle>
            <DetailValue>{method}</DetailValue>
          </Detail>
          <Detail>
            <DetailTitle>Order Total</DetailTitle>
            <DetailValue>{`₹ ${orderDetails.Total}`}</DetailValue>
          </Detail>
          <Detail>
            <DetailTitle>Delivery Charges</DetailTitle>
            <DetailValue>{`₹ 0`}</DetailValue>
          </Detail>
          <Detail>
            <DetailTitle>Savings</DetailTitle>
            <DetailValue>{`₹ ${orderDetails.Savings}`}</DetailValue>
          </Detail>
          <Divider />
          <Detail>
            <DetailTitle>Total</DetailTitle>
            <DetailValue>{`₹ ${orderDetails.Total}`}</DetailValue>
          </Detail>
        </PaymentDetails>
        <AddressDetails>
          <Title>Address Details</Title>
          <Detail>
            <DetailTitle>House no</DetailTitle>
            <DetailValue>{personal_info.houseno}</DetailValue>
          </Detail>
          <Detail>
            <DetailTitle>Apartment Name</DetailTitle>
            <DetailValue>{personal_info.apartment_name}</DetailValue>
          </Detail>
          <DetailTitle style={{marginVertical: Metrics.baseMargin}}>
            Street details to locate you
          </DetailTitle>
          <DetailValue>{personal_info.street_details}</DetailValue>
          <DetailTitle style={{marginVertical: Metrics.baseMargin}}>
            Landmark for easy reach out
          </DetailTitle>
          <DetailValue>{personal_info.landmark}</DetailValue>
        </AddressDetails>
      </ScrollView>
      <View
        style={{
          backgroundColor: Colors.white,
          paddingVertical: Metrics.smallMargin,
          paddingHorizontal: Metrics.smallMargin,
        }}>
        
        <CustomButton
          isLoading={isLoading}
          text="CONFIRM"
          onPress={onContinue}
          primary
        />
      </View>
    </Container>
  );
};
const mapStateToProps = (reducers: any) => {
  return {
    cart: reducers.cart,
    personal_info: reducers.personal_info.personal_info,
  };
};
export default connect(mapStateToProps)(ConfirmOrderScreen);
