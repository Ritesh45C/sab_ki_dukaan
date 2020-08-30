import React, {useState} from 'react';
import {View} from 'react-native';
import {Container, Title, InputsContainer, SubTitle, TextError} from './styles';
import {Grid, Row} from 'react-native-easy-grid';
import OtpInputs from 'react-native-otp-inputs';
import * as signupActions from 'redux/actions/signupActions';
import {connect, useDispatch} from 'react-redux';
import validate from 'utils/validations';
import FirebaseServices from 'services/FirebaseService';
import auth from '@react-native-firebase/auth';
import CustomButton from 'components/CustomButton';
import {ErrorHandler} from 'types/General';
import {startup} from 'redux/actions/startupActions';
import NavigationService from 'services/NavigationService';
import { noError } from 'utils/general';
import { SignUpTypes } from 'types/Auth';


const OtpVerificationScreen = (props:any) => {
  const dispatch = useDispatch();
  const {credential} = props.route.params;
  const {inputHandler, inputHandlerRequest} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [errorHandler, setErrorHandler] = useState<ErrorHandler>(noError());

  const {with_otp,location,selected_address}: SignUpTypes['auth_data'] = props.auth_data
  const {otp_code,phone_number,password} = props.phone_verification;
  const {user_info} = props

  const onChange = (name: string, event: any, step: string) => {
    inputHandlerRequest();
    inputHandler({name, value: event}, step);
  };

  const codeValidation = async () => {
    setIsLoading(true);
    const params = {
      step: 'otp_verification',
      otp_code: otp_code,
    };
    const isValidate: ErrorHandler = validate(params);
    if (!isValidate.error) {
      try {
        const phoneCred = auth.PhoneAuthProvider.credential(
          credential.verificationId,
          otp_code,
        );
      
        if (!with_otp) {
          if(location==null) return;
          const userAddress = {
            city: location.cityName,
            selectedAddress:selected_address
          }
          const isSignup = await FirebaseServices.createUserPhoneAndPassword(
            phone_number,
            password,
            phoneCred,
            userAddress,
            user_info
          );

          setErrorHandler(noError());
          dispatch(startup());
        } else {
         
          await credential.verificationId.confirm(
            otp_code,
          );

          const user = auth().currentUser;
          if(user){
            if (user.providerData.length == 1) {
              NavigationService.navigate("SelectLocationScreen", {})
              return;
            }

            dispatch(startup());
          }
       
        }
        
      } catch (error) {
        console.warn(error)
        if (error.code == 'auth/email-already-in-use') {
          setErrorHandler({
            code:"ERR_PHONENUMBER_IN_USE",
            error: true,
            error_message: {
              title: error.code,
              message: 'The phone number entered is already in use.',
            },
          });
        } else if (error.code == 'auth/invalid-verification-code') {
          setErrorHandler({
            code:"ERR_SMS_VERIFICATION_CODE_INVALID",
            error: true,
            error_message: {
              title: error.code,
              message:
                'The sms verification code used to create the phone auth credential is invalid.',
            },
          });
        } else {
          setErrorHandler({
            code:"ERR_GENERAL",
            error: true,
            error_message: {
              title: error.code,
              message: error.code,
            },
          });
        }
      }
    } else {
      setErrorHandler(isValidate);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <InputsContainer>
        <Title>Enter OTP</Title>
        <SubTitle>
          One Time Password send to {credential.phone_number}{' '}
        </SubTitle>
        <Grid>
          <Row size={3}>
            <View
              style={{
                width: '50%',
                height: 110,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <OtpInputs
                style={{flexDirection: 'row'}}
                handleChange={code => {
                  onChange('otp_code', code, signupActions.PHONE_VERIFICATION);
                }}
                numberOfInputs={6}
                inputStyles={{
                  borderBottomWidth: 1,
                  marginHorizontal: 16,
                  textAlign: 'center',
                  fontSize: 32,
                }}
              />
            </View>
          </Row>

          <Row size={1}>
            <View style={{width: '100%'}}>
              {errorHandler.error && (
                <TextError>
                  {' '}
                  {errorHandler.error_message.message}
                </TextError>
              )}
              <CustomButton
                isLoading={isLoading}
                text="VERIFY"
                onPress={codeValidation}
                primary
              />
            </View>
          </Row>
        </Grid>
      </InputsContainer>
    </Container>
  );
};
const mapStateToProps = (reducers: any) => {
  return reducers.signup;
};
export default connect(mapStateToProps, signupActions)(OtpVerificationScreen);
