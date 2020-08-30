import React, {useState, Fragment} from 'react';
import {View} from 'react-native';
import {
  Container,
  Title,
  InputsContainer,
  SubTitle,
  TextError,
  TextErrorContainer,
} from './styles';
import {Grid, Row} from 'react-native-easy-grid';
import {Item, Input, Text} from 'native-base';
import NavigationService from 'services/NavigationService';
import * as signupActions from 'redux/actions/signupActions';
import {connect, useSelector} from 'react-redux';
import validate from 'utils/validations';
import FirebaseServices from 'services/FirebaseService';
import CustomButton from 'components/CustomButton';
import {ErrorHandler} from 'types/General';
import auth from '@react-native-firebase/auth';
import {noError, countryCode} from 'utils/general';
import { Colors, Metrics } from 'Theme';
import { SignUpTypes } from 'types/Auth';
type inputType = {
  name: string;
  value: string;
};

const PhoneVerificationScreen = (props: any) => {
  const {inputHandler, inputHandlerRequest} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [errorHandler, setErrorHandler] = useState<ErrorHandler>({
    code: 'ERR_EMPTY',
    error: false,
    error_message: {
      title: '',
      message: '',
    },
  });   
  
  const {phone_number,password,confirm_password} = props.phone_verification

  const {with_otp} = useSelector((state: {signup: SignUpTypes}) => {
    return state.signup.auth_data;
  });

  const onChange = (name: string, event: any, step: string) => {
    inputHandlerRequest();
    inputHandler({name, value: event}, step);
  };

  const verificationId = async () => {
    if (!with_otp) {
      return await FirebaseServices.VerifyPhone(
        phone_number,
      );
    } else {
      return await auth().signInWithPhoneNumber(
        countryCode + phone_number,
      );
    }
  };
  const getParams = (withotp: boolean) => {
     if(!withotp){
      return {
        step: signupActions.PHONE_VERIFICATION,
        phone_number: phone_number,
        password: password,
        confirm_password: confirm_password,
      }
     }else{
       return {
        step: signupActions.WITH_OTP,
        phone_number: phone_number,
      }
     }
  }
  const VerifyAndSendCode = async () => {
    setIsLoading(true);
    const params = getParams(with_otp)

    const isValidate: any = validate(params);
    if (!isValidate.error) {
      try {
        const result = await verificationId();
        setErrorHandler(noError());

        NavigationService.navigate('OtpVerificationScreen', {
          credential: {
            verificationId: result
          }
        });

      } catch (error) {
        console.log(error.code);
        setErrorHandler(error);
      }
    } else {
      setErrorHandler(isValidate);
    }
    setIsLoading(false);
  };
  return (
    <Container>
      <InputsContainer>
        <Title>Please Enter Your Mobile Number</Title>
        <SubTitle>Don't worry! We' ll not spam you.</SubTitle>
        <Grid>
          <Row size={3}>
            <View
              style={{
                width: '50%',
                height: 150,
                justifyContent: 'space-between',
              }}>
              <Item>
                <Input
                  keyboardType="number-pad"
                  placeholder="Mobile Number"
                  maxLength={16}
                  value={phone_number}
                  onChangeText={event => {
                    onChange('phone_number', event, signupActions.PHONE_VERIFICATION);
                  }}
                />
              </Item>
              {!with_otp && (
                <Fragment>
                  <Item>
                    <Input
                      placeholder="Password"
                      maxLength={16}
                      secureTextEntry
                      value={password}
                      onChangeText={event => {
                        onChange('password', event, signupActions.PHONE_VERIFICATION);
                      }}
                    />
                  </Item>
                  <Item>
                    <Input
                      placeholder="Confirm Password"
                      maxLength={16}
                      secureTextEntry
                      value={confirm_password}
                      onChangeText={event => {
                        onChange(
                          'confirm_password',
                          event,
                          signupActions.PHONE_VERIFICATION,
                        );
                      }}
                    />
                  </Item>
                </Fragment>
              )}

      
            </View>
          </Row>
          {errorHandler.error && (
                <TextErrorContainer>
                  <TextError>{errorHandler.error_message.message}</TextError>
                </TextErrorContainer>
              )}
          <Row size={1}>
            
            <View style={{width: '100%'}}>
              <CustomButton
                isLoading={isLoading}
                text="CONTINUE"
                onPress={VerifyAndSendCode}
                primary
              />

              <Text style={{color: Colors.gray, fontSize: 12, textAlign:"center",marginVertical:Metrics.baseMargin}}>
              BY CONTINUING I ACCEPT THE PRIVACY POLICY
              </Text>
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
export default connect(
  mapStateToProps,
  signupActions,
)(PhoneVerificationScreen);
