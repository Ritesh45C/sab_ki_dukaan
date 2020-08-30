import React, { useState } from 'react';
import {
  Container,
  PaymentDetails,
  Title,
  Detail,
  DetailTitle,
  DetailValue,
  Divider,
  AddressDetails,
  ButtonContainer,
} from './styles';
import {Grid, Row} from 'react-native-easy-grid';
import {Metrics} from 'Theme';
import {ScrollView} from 'react-native';
import {OrderData} from 'types/Orders';
import CustomButton from 'components/CustomButton';
import NavigationService from 'services/NavigationService';
import ModalSingleton from 'containers/ModalSingleton';
import functions from '@react-native-firebase/functions'
import { ErrorHandler } from 'types/General';
import auth from '@react-native-firebase/auth';
import { noError } from 'utils/general';

interface OrderPaymentSelectedProps {
  route: {
    params: {
      order: OrderData;
    };
  };
}
interface Response {
  server_response: {paid_out: boolean; method: string};
  server_error: ErrorHandler;
}
const OrderPaymentSelectedScreen = (props: OrderPaymentSelectedProps) => {
  const {order} = props.route.params;
  const [itsPaying, setItsPaying] = useState(false);
  const [apiError, setApiError] = useState<ErrorHandler>({
    code: 'ERR_EMPTY',
    error: false,
    error_message: {title: '', message: ''},
  });
  const onPaymentIsWallet = async () => {
    const {orderId} = order

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
  const renderActionsErrorModal = (code: string) => {
    if (code == 'ERR_PAYMENT_WALLET_001') {
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
        ModalSingleton.singletonRef.toggle();
      }}
      transparent
    />
    }
  };
  const renderOrderPaymentSelectedActions = () => {
    if(!order.payment.paid_out){
      if(order.method == 'CARD'){
       return <ButtonContainer>
        <CustomButton
          onPress={() => {
            NavigationService.navigate('PaymentScreen', {
              orderId: order.orderId,
              type:'orderPaymentSelected'
            });
          }}
          primary
          text="Pay"
        />
      </ButtonContainer>
      }else if(order.method == 'WALLET'){
        return <ButtonContainer>
        <CustomButton
          onPress={onPaymentIsWallet}
          primary
          text="Pay with my wallet."
        />
      </ButtonContainer>
      }
    }else{
      return null
    }
  }
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
          title="Payment has been successful."
          description="Our team will contact you."
          renderActionsContainer={
          <CustomButton
            text="CLOSE"
            onPress={() => {
              NavigationService.onlyGoBack()
              ModalSingleton.singletonRef.toggle();
            }}
            transparent
          />}
        />
      )}
      <ScrollView>
        <PaymentDetails>
          <Title>Payment Details</Title>
          <Detail>
            <DetailTitle>Type</DetailTitle>
            <DetailValue>{order.method}</DetailValue>
          </Detail>
          <Detail>
            <DetailTitle>Order Total</DetailTitle>
            <DetailValue>{`₹ ${order.orderDetails.Total}`}</DetailValue>
          </Detail>
          <Detail>
            <DetailTitle>Delivery Charges</DetailTitle>
            <DetailValue>{`₹ 0`}</DetailValue>
          </Detail>
          <Detail>
            <DetailTitle>Savings</DetailTitle>
            <DetailValue>{`₹ ${order.orderDetails.Savings}`}</DetailValue>
          </Detail>
          <Divider />
          <Detail>
            <DetailTitle>Total</DetailTitle>
            <DetailValue>{`₹ ${order.orderDetails.Total}`}</DetailValue>
          </Detail>
        </PaymentDetails>
        <AddressDetails>
          <Title>Address Details</Title>
          <Detail>
            <DetailTitle>House no</DetailTitle>
            <DetailValue>{order.houseno}</DetailValue>
          </Detail>
          <Detail>
            <DetailTitle>Apartment Name</DetailTitle>
            <DetailValue>{order.apartment_name}</DetailValue>
          </Detail>
          <DetailTitle style={{marginVertical: Metrics.smallMargin}}>
            Street details to locate you
          </DetailTitle>
          <DetailValue>{order.street_details}</DetailValue>
          <DetailTitle style={{marginVertical: Metrics.smallMargin}}>
            Landmark for easy reach out
          </DetailTitle>
          <DetailValue>{order.landmark}</DetailValue>
        </AddressDetails>
 
        {renderOrderPaymentSelectedActions()}

      </ScrollView>
    </Container>
  );
};

export default OrderPaymentSelectedScreen;
