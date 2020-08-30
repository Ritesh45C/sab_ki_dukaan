import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Container,
  Title,
  InputsContainer,
  TextError,
  TextErrorContainer,
} from './styles';
import {Grid, Row} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Item, Input, Text} from 'native-base';
import CustomButton from 'components/CustomButton';
import {ErrorHandler} from 'types/General';
import {connect, useDispatch} from 'react-redux';
import * as signupActions from 'redux/actions/signupActions';
import FirebaseService from 'services/FirebaseService';
import NavigationService from 'services/NavigationService';
import {startup} from 'redux/actions/startupActions';
import {validatePersonalInfoForm} from 'utils/validations';

const LogInScreen = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorHandler, setErrorHandler] = useState<ErrorHandler>({
    code: 'ERR_EMPTY',
    error: false,
    error_message: {title: '', message: ''},
  });
  const {inputHandler, inputHandlerRequest} = props;
  const onChange = (name: string, event: any, step: string) => {
    inputHandlerRequest();
    inputHandler({name, value: event}, step);
  };
  const dispatch = useDispatch();
  const signIn = async () => {
    setIsLoading(true);
    try {
      // @ts-ignore
      const isValidate: any = validatePersonalInfoForm({
        mobile_number: props.log_in.phone_number,
        password: props.log_in.password,
        step: 'log_in',
      });
      if (!isValidate.error) {
        await FirebaseService.LogIn(
          props.log_in.phone_number,
          props.log_in.password,
        );
        dispatch(startup());
      } else {
        setErrorHandler(isValidate);
      }
    } catch (error) {
      setErrorHandler(error);
    }
    setIsLoading(false);
  };
  const LogInwithOTP = () => {
    dispatch(signupActions.authDataHandler('with_otp',true))
    NavigationService.navigate('PhoneVerificationScreen', {})
  }
  return (
    <Container>
      <InputsContainer>
        <Title>Log In</Title>
        <Grid>
          <Row size={3}>
            <View
              style={{
                width: '50%',
                height: 110,
                justifyContent: 'space-between',
              }}>
              <Item>
                <Input
                  keyboardType="number-pad"
                  placeholder="Mobile Number"
                  maxLength={16}
                  value={props.log_in.phone_number}
                  onChangeText={event => {
                    onChange('phone_number', event, signupActions.LOG_IN);
                  }}
                />
              </Item>
              <Item>
                <Input
                  maxLength={16}
                  secureTextEntry={true}
                  placeholder="Password"
                  value={props.log_in.password}
                  onChangeText={event => {
                    onChange('password', event, signupActions.LOG_IN);
                  }}
                />
              </Item>
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
                text="Log In"
                onPress={signIn}
                primary
              />
              <CustomButton
                isLoading={isLoading}
                text="Log In with OTP"
                onPress={LogInwithOTP}
                transparent
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
export default connect(
  mapStateToProps,
  signupActions,
)(LogInScreen);
