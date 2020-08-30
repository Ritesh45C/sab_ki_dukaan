import {
  INPUT_HANDLER,
  INPUT_HANDLER_REQ,
  USER_INFO,
  PHONE_VERIFICATION,
  LOG_IN,
  AUTH_DATA_HANDLER,
} from '../actions/signupActions';
import { SignUpTypes, SignUpReducerProps } from 'types/Auth';



const INITIAL_STATE: SignUpTypes = {
  auth_data: {
    with_otp: false,
    auth_type: 'normal',
    location: null,
    selected_address: null,
  },
  user_info: {
    name: '',
    lastname: '',
    houseno: '',
    apartment_name: '',
    street_details: '',
    landmark: '',
  },
  phone_verification: {
    phone_number: '',
    password: '',
    confirm_password: '',
    otp_code: '',
  },
  log_in: {
    phone_number: '',
    password: '',
  },
  isUpdating: false,
};



const reducer = (state = INITIAL_STATE, {type, input, step, field, authDataPayload}: SignUpReducerProps) => {
  switch (type) {
    case AUTH_DATA_HANDLER:
      return {
        ...state,
        auth_data:{
          ...state.auth_data,
          [field]: authDataPayload
        }
      }
    case INPUT_HANDLER:
      switch (step) {
        case USER_INFO:
          return {
            ...state,
            user_info: {
              ...state.user_info,
              [input.name]: input.value,
            },
            isUpdating: !state.isUpdating,
          };
        case PHONE_VERIFICATION:
          return {
            ...state,
            phone_verification: {
              ...state.phone_verification,
              [input.name]: input.value,
            },
            isUpdating: !state.isUpdating,
          };
        case LOG_IN:
          return {
            ...state,
            log_in: {
              ...state.log_in,
              [input.name]: input.value,
            },
            isUpdating: !state.isUpdating,
          };
      }
    case INPUT_HANDLER_REQ:
      return {
        ...state,
        isUpdating: true,
      };

    default:
      return state;
  }
};

export default reducer;
