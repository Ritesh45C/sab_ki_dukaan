import React, {useState, useEffect} from 'react';
import {
  Container,
  InputsContainer,
  Title,
  TextError,
  InputCont,
  SubTitle,
  TitleMain,
  TextErrorContainer,
} from './styles';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {View, ScrollView} from 'react-native';
import {Item, Input} from 'native-base';
import {ErrorHandler} from 'types/General';
import CustomButton from 'components/CustomButton';
import {connect, useSelector} from 'react-redux';
import NavigationService from 'services/NavigationService';
import validate from 'utils/validations';
import * as signupActions from 'redux/actions/signupActions';
import { SignUpTypes } from 'types/Auth';


const UserInfoScreen = (props: any) => {
  const [errorHandler, setErrorHandler] = useState<ErrorHandler>({
    code:"ERR_EMPTY",
    error: false,
    error_message: {title: '',  message: ''},
  });
  const {inputHandler, inputHandlerRequest} = props;
  const onChange = (name: string, event: any, step: string) => {
    inputHandlerRequest();
    inputHandler({name, value: event}, step);
  };
  
  const {user_info} = props
  const onContinue = async () => {
    const isValidate: any = validate({
      name:user_info.name,
      lastname: user_info.lastname,
      apartment_name: user_info.apartment_name,
      houseno: user_info.houseno,
      street_details: user_info.street_details,
      step: signupActions.USER_INFO,
    });
    if (!isValidate.error) {
      NavigationService.navigate('PhoneVerificationScreen',{});
    }else{
      setErrorHandler(isValidate);
    }
  };
  const {selected_address} = useSelector((state: {signup: SignUpTypes}) => {
    return state.signup.auth_data;
  });
  useEffect(()=>{
    if(selected_address){
      onChange('street_details', selected_address.secondary_text, signupActions.USER_INFO);
    }
  },[])
  return (
    <Container>

      <InputsContainer>

        <ScrollView>
        <TitleMain>Please Enter Your Personal Info</TitleMain>
        <SubTitle>Don't worry, your data is safe.</SubTitle>
       
          <Grid>
            <Row style={{height: 80}}>
              <Col>
                <InputCont>
                  <Item>
                    <Input
                      placeholder="First Name *"
                      maxLength={16}
                      value={user_info.name}
                      onChangeText={event => {
                        onChange('name', event, signupActions.USER_INFO);
                      }}
                    />
                  </Item>
                </InputCont>
              </Col>
              <Col>
                <InputCont>
                  <Item>
                    <Input
                      maxLength={16}
                      placeholder="Lastname *"
                      value={user_info.lastname}
                      onChangeText={event => {
                        onChange('lastname', event, signupActions.USER_INFO);
                      }}
                    />
                  </Item>
                </InputCont>
              </Col>
            </Row>
            <Title>Address Detail</Title>
            <Row style={{height: 80}}>
              <Col>
                <InputCont>
                  <Item>
                    <Input
                      placeholder="House no *"
                      maxLength={10}
                      value={user_info.houseno}
                      onChangeText={event => {
                        onChange('houseno', event, signupActions.USER_INFO);
                      }}
                    />
                  </Item>
                </InputCont>
              </Col>
              <Col>
                <InputCont>
                  <Item>
                    <Input
                      maxLength={16}
                      placeholder="Apartment name *"
                      value={user_info.apartment_name}
                      onChangeText={event => {
                        onChange('apartment_name', event, signupActions.USER_INFO);
                      }}
                    />
                  </Item>
                </InputCont>
              </Col>
            </Row>
            <Row style={{height: 80}}>
              <InputCont>
                <Item>
                  <Input
                    multiline={true}
                    maxLength={100}
                    placeholder="Street details to locate you *"
                    value={user_info.street_details}
                    onChangeText={event => {
                      onChange('street_details', event,signupActions.USER_INFO);
                    }}
                  />
                </Item>
              </InputCont>
            </Row>
            <Row size={0.5}>
              <InputCont>
                <Item>
                  <Input
                    maxLength={40}
                    placeholder="Landmark for easy reach out"
                    value={user_info.landmark}
                    onChangeText={event => {
                      onChange('landmark', event,signupActions.USER_INFO);
                    }}
                  />
                </Item>
              </InputCont>
            </Row>
          </Grid>
        </ScrollView>
      </InputsContainer>
      {errorHandler.error && (
        <TextErrorContainer>
          <TextError>{errorHandler.error_message.message}</TextError>
        </TextErrorContainer>
      )}
      <View style={{width: '100%'}}>
        <CustomButton text="CONTINUE" onPress={onContinue} primary />
      </View>
    </Container>
  );
};


const mapStateToProps = (reducers: any) => {
  return reducers.signup;
};
export default connect(mapStateToProps, signupActions)(UserInfoScreen);



