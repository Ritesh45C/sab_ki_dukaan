import React, {Fragment} from 'react';
import {Container, Title, SmallText, LocationsContainer} from './styles';
import Badge from 'components/Badge';
import NavigationService from 'services/NavigationService';
import {useDispatch} from 'react-redux';
import {GoogleLocationResult} from 'components/GoogleAutocomplete/services/Google.service';
import {authDataHandler} from 'redux/actions/signupActions';
import {LocationType} from 'types/Auth';
const SelectLocation = (props: any) => {
  const dispatch = useDispatch();
  const getLocations = () => {
    return [
      {cityName: 'Dehradun', location: {lat: 30.3254097, lng: 77.9469228}},
    ];
  };
  const onSelectLocation = (Location: LocationType) => {
    dispatch(authDataHandler('location', Location));
    NavigationService.navigate('SearchLocationScreen', {});
  };
  return (
    <Container>
      <SmallText>Let us know</SmallText>
      <Title>Your Location</Title>
      <LocationsContainer>
        {getLocations().map((Location, index) => {
          return (
            <Badge key={index} onPress={() => onSelectLocation(Location)}>
              {Location.cityName}
            </Badge>
          );
        })}
      </LocationsContainer>
    </Container>
  );
};

export default SelectLocation;
