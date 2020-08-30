import React, {useState, useEffect} from 'react';
import {
  Container,
  InputsContainer,
  Title,
  TextError,
  InputCont,
} from './styles';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {View, ScrollView} from 'react-native';
import {Item, Input} from 'native-base';
import {ErrorHandler} from 'types/General';
import CustomButton from 'components/CustomButton';
import {connect, useDispatch} from 'react-redux';
import * as personalInfoActions from 'redux/actions/personalInfoActions';
import NavigationService from 'services/NavigationService';
import {validatePersonalInfoForm} from 'utils/validations';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ModalSingleton from 'containers/ModalSingleton';
import FirebaseService from 'services/FirebaseService';

const PersonalInfoScreen = (props: any) => {
  const [errorHandler, setErrorHandler] = useState<ErrorHandler>({
    code:"ERR_EMPTY",
    error: false,
    error_message: {title: '',  message: ''},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const {inputHandler, inputHandlerRequest} = props;
  const onChange = (name: string, event: any, step: string) => {
    inputHandlerRequest();
    inputHandler({name, value: event}, step);
  };
  const PaymentMethod = props.route.params.method;
  const onContinue = async () => {
    let isValidate;
    const user = auth().currentUser;
    if (user) {
      if (user.isAnonymous) {
        isValidate = validatePersonalInfoForm({
          ...props.personal_info.personal_info,
          step: 'personal_info',
        });
      }else{
        isValidate = validatePersonalInfoForm({
          ...props.personal_info.personal_info,
          step: 'personal_info_user',
        });
       
      }
    }
    console.log(props.personal_info.personal_info)
    if(isValidate){
      if (!isValidate.error) {
        setErrorHandler({
          code:'ERR_EMPTY',
          error: false,
          error_message: {title: '',  message: ''},
        });
        NavigationService.navigate('ConfirmOrderScreen', {method: PaymentMethod});
      }
    }

  };
  const dispatch = useDispatch();
  const fetchUserData = () => {
    dispatch({type:"_LOADING"})
    setIsSignUp(true);
    FirebaseService.fetchUserData().then(userData => {
      if(userData){
 
        const {personal_info} = userData
        if(personal_info){
          onChange('name', personal_info.name, 'personal_info');
          onChange('lastname', personal_info.lastname, 'personal_info');
          onChange('houseno', personal_info.houseno, 'personal_info');
          onChange('apartment_name', personal_info.apartment_name, 'personal_info');
          onChange('street_details', personal_info.street_details, 'personal_info');
          onChange('landmark', personal_info.landmark, 'personal_info');
          onChange('mobile_number', userData.phoneNumber, 'personal_info');
        }

      }
      setIsLoading(false);
      dispatch({type:"_SUCCESS"})
    }).catch((error: ErrorHandler) => {
      console.warn(error)
      setIsLoading(false);
      dispatch({type:"_SUCCESS"})
      ModalSingleton.singletonRef.toggle();

    })
  }
  const componentDidMount = () => {
    const user = auth().currentUser;
    if (user) {
      if (!user.isAnonymous) {
        fetchUserData();
      }else {
        setIsLoading(false);
      }
    }
  };
  useEffect(componentDidMount, []);
  if(isLoading) return null
  return (
    <Container>
      <ModalSingleton
        title="Unable to connect the server."
        description="Please check your internet connection."
        renderActionsContainer={
          <CustomButton
            isLoading={isLoading}
            primary
            text="Retry"
            onPress={() => {
              fetchUserData();
            }}
          />
        }
      />
      <InputsContainer>
        <ScrollView>
          <Grid>
            {!isSignUp && (
              <React.Fragment>
                 <Title>Personal info</Title>
                <Row style={{height: 80}}>
                 
                  <Col>
                    <InputCont>
                      <Item>
                        <Input
                          placeholder="First Name *"
                          maxLength={16}
                          value={props.personal_info.personal_info.name}
                          onChangeText={event => {
                            onChange('name', event, 'personal_info');
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
                          value={props.personal_info.personal_info.lastname}
                          onChangeText={event => {
                            onChange('lastname', event, 'personal_info');
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
                        keyboardType="numeric"
                        maxLength={16}
                        placeholder="Mobile Number *"
                        value={props.personal_info.personal_info.mobile_number}
                        onChangeText={event => {
                          onChange('mobile_number', event, 'personal_info');
                        }}
                      />
                    </Item>
                  </InputCont>
                </Row>
              </React.Fragment>
            )}

            <Title>Address Detail</Title>
            <Row style={{height: 80}}>
              <Col>
                <InputCont>
                  <Item>
                    <Input
                      placeholder="House no *"
                      maxLength={10}
                      value={props.personal_info.personal_info.houseno}
                      onChangeText={event => {
                        onChange('houseno', event, 'personal_info');
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
                      value={props.personal_info.personal_info.apartment_name}
                      onChangeText={event => {
                        onChange('apartment_name', event, 'personal_info');
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
                    maxLength={30}
                    placeholder="Street details to locate you *"
                    value={props.personal_info.personal_info.street_details}
                    onChangeText={event => {
                      onChange('street_details', event, 'personal_info');
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
                    value={props.personal_info.personal_info.landmark}
                    onChangeText={event => {
                      onChange('landmark', event, 'personal_info');
                    }}
                  />
                </Item>
              </InputCont>
            </Row>
          </Grid>
        </ScrollView>
      </InputsContainer>
      {errorHandler.error && (
        <TextError>{errorHandler.error_message.message}</TextError>
      )}
      <View style={{width: '100%'}}>
        <CustomButton text="CONTINUE" onPress={onContinue} primary />
      </View>
    </Container>
  );
};

const mapStateToProps = (reducers: any) => {
  return {personal_info: reducers.personal_info, cart: reducers.cart};
};
export default connect(
  mapStateToProps,
  personalInfoActions,
)(PersonalInfoScreen);
