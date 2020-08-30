import {GoogleLocationResult} from 'components/GoogleAutocomplete/services/Google.service';


export interface SignUpReducerProps {
    type: string;
    input: inputType;
    step:  'USER_INFO' |  'PHONE_VERIFICATION' | 'LOG_IN',
    field: AuthDataHandlerProps['field'],
    authDataPayload: AuthDataHandlerProps['payload']
}

export type userDataType = {
  uid: string;
  phone_number: number;
  photourl?: string;
};
export interface LocationType {
  cityName: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface SignUpTypes {
  auth_data: {
    with_otp: boolean;
    auth_type: 'normal' | 'anonymously';
    location: LocationType | null;
    selected_address: GoogleLocationResult['structured_formatting'] | null;
  };
  user_info: {
    name: string;
    lastname: string;
    houseno: number | string;
    apartment_name: number | string;
    street_details: string;
    landmark: string;
  };
  phone_verification: {
    phone_number: string | number;
    password: string;
    confirm_password: string;
    otp_code: number | string;
  };
  log_in: {
    phone_number: string | number;
    password: string;
  };
  isUpdating: boolean;
}

export type with_otp = 'with_otp';
export type auth_type = 'auth_type';
export type location = 'location';
export type selected_address = 'selected_address';

export type inputType = {
  name: string;
  value: string;
};

export interface AuthDataHandlerProps {
  field: with_otp | auth_type | location | selected_address;
  payload:
    | SignUpTypes['auth_data'][with_otp]
    | SignUpTypes['auth_data'][auth_type]
    | SignUpTypes['auth_data'][location]
    | SignUpTypes['auth_data'][selected_address];
}
