import React, {useState} from 'react';
import {View} from 'react-native';
import {Container, LogoContainer, Logo, ButtonsContainer} from './styles';
import {Grid, Row} from 'react-native-easy-grid';
import NavigationService from 'services/NavigationService';
import {Metrics, Images} from 'Theme';
import CustomButton from 'components/CustomButton';
import {useDispatch} from 'react-redux';
import ModalSingleton from 'containers/ModalSingleton';
import {ErrorHandler} from 'types/General';
import { authDataHandler } from 'redux/actions/signupActions';

const InitialScreen = () => {
  const dispatch = useDispatch();
  const SignUp = () => {
    dispatch(authDataHandler('auth_type','normal'))
    dispatch(authDataHandler('with_otp',false))
    NavigationService.navigate("SelectLocationScreen",{})

  }
  const LogInAnonymously = () => {
    dispatch(authDataHandler('auth_type','anonymously'))
    NavigationService.navigate("SelectLocationScreen",{})

  }
  const LogIn = () => {
    NavigationService.navigate('LogInScreen', {})
  }

  return (
    <Container>
 
      <Grid>
        <Row size={3}>
          <LogoContainer>
            <Logo
              imageStyle={{
                resizeMode: 'contain',
                borderRadius: 200,
                borderWidth: 1,
              }}
              source={Images.logo}
            />
          </LogoContainer>
        </Row>
        <Row size={1.2}>
          <ButtonsContainer>
            <CustomButton
              primary
              onPress={SignUp}
              text="SIGN UP"
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomButton
                onPress={LogIn}
                transparent
                light
                rightText="Have an Account?"
                text="LOG IN"
              />
            </View>
            <CustomButton
              onPress={LogInAnonymously}
              transparent
              light
              text="I JUST WANNA EXPLORE"
            />
          </ButtonsContainer>
        </Row>
      </Grid>
    </Container>
  );
};
export default InitialScreen;
