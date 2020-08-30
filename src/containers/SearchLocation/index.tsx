import React, {useState} from 'react';
import {GoogleAutoComplete} from 'components/GoogleAutocomplete';

import {
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Metrics} from 'Theme';
import NavigationService from 'services/NavigationService';
import {
  SearchInput,
  ResultContainer,
  ResultName,
  ResultAddress,
  InputContainer,
} from './styles';
import FirebaseService from 'services/FirebaseService';
import {startup} from 'redux/actions/startupActions';
import ModalSingleton from 'containers/ModalSingleton';
import {useDispatch, useSelector} from 'react-redux';
import {ErrorHandler} from 'types/General';
import CustomButton from 'components/CustomButton';
import LoadingModalSingleton from 'components/Loading';
import {GoogleLocationResult} from 'components/GoogleAutocomplete/services/Google.service';
import {authDataHandler} from 'redux/actions/signupActions';
import {SignUpTypes} from 'types/Auth';
interface SearchInputType {
  onLocationSelected: Function;
  route: any; //Route<>
  navigation: any;
}
const SearchLocation = ({route, navigation}: SearchInputType) => {
  
  const [loading, isLoading] = useState(false);
  const {auth_type, location} = useSelector(
    (state: {signup: SignUpTypes}) => {
      return state.signup.auth_data;
    },
  );

  const [errorHandler, setErrorHandler] = useState<ErrorHandler>({
    code: 'ERR_EMPTY',
    error: false,
    error_message: {
      title: '',
      message: '',
    },
  });
  const dispatch = useDispatch();

  const LogInAnonymously = async (selected_address:GoogleLocationResult['structured_formatting']) => {
    isLoading(true);
    try {
      if (location && selected_address) {
        await FirebaseService.LogInAnonymously({
          city: location.cityName,
          selectedAddress: selected_address,
        });
        dispatch(startup());
      }
 
    } catch (e) {
      const ErrorResult = FirebaseService.setErrorHandler({
        code: 'ERR_CONNECTION',
        error: true,
        error_message: {
          title: 'Error',
          message: 'Unable to connect the server.',
        },
      });
      setErrorHandler(ErrorResult);
      isLoading(false);
      ModalSingleton.singletonRef.toggle();
    }
    isLoading(false);
  };
  const WhenlocationSelected = (
    structured_formatting: GoogleLocationResult['structured_formatting'],
  ) => {
    dispatch(authDataHandler('selected_address', structured_formatting));
    if (auth_type == 'normal') {
      NavigationService.navigate('UserInfoScreen', {});
    } else if (auth_type == 'anonymously') {
      LogInAnonymously(structured_formatting);
    } else {
      console.warn('Error in SearchLocation passing parameters');
    }
  };
  if(location == null) return;
  navigation.setOptions({title: location.cityName});
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ModalSingleton
        title={errorHandler.error_message.title}
        description={errorHandler.error_message.message}
        renderActionsContainer={
          <View>
            <CustomButton
              primary
              text="Retry"
              onPress={() => {
                ModalSingleton.singletonRef.toggle();
              }}
            />
          </View>
        }
      />
      <LoadingModalSingleton visible={loading} />
      <GoogleAutoComplete
        apiKey="AIzaSyAPxkUgFsN8cpDlmONd8zrmielBB5eFrFc"
        lat={location.location.lat}
        lng={location.location.lng}
        radius="50000"
        debounce={300}
        strictbounds={true}>
        {({inputValue, handleTextChange, locationResults, fetchDetails}) => (
          <React.Fragment>
            <InputContainer>
              <SearchInput
                value={inputValue}
                onChangeText={handleTextChange}
                placeholder="Search your location..."
              />
            </InputContainer>
            <ScrollView>
              {locationResults.map((el, i) => {
                const {structured_formatting} = el;
                return(

                  <TouchableOpacity
                    key={i}
                    onPress={() => WhenlocationSelected(structured_formatting)}>
                    <ResultContainer>
                      <ResultName>
                        {el.structured_formatting.main_text}
                      </ResultName>
                      <ResultAddress>
                        {el.structured_formatting.secondary_text}
                      </ResultAddress>
                    </ResultContainer>
                  </TouchableOpacity>
                )
        
              })}
            </ScrollView>
          </React.Fragment>
        )}
      </GoogleAutoComplete>
    </View>
  );
};

SearchLocation.defaultProps = {};

export default SearchLocation;
