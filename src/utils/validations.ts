import validator from 'validator';
import {noError} from './general';
import { USER_INFO, WITH_OTP, PHONE_VERIFICATION } from 'redux/actions/signupActions';

const returnError = (
  code: string,
  error: boolean,
  title: string,
  message: string,
) => {
  return {
    code,
    error,
    error_message: {
      title,
      message,
    },
  };
};

interface PersonalInfoTypes {
  step: string;
  name: string;
  lastname: string;
  mobile_number: string;
  houseno: string;
  apartment_name: string;
  street_details: string;
  landmark: string;
  password: string;
}
export const validatePersonalInfoForm = ({
  step,
  name,
  lastname,
  mobile_number,
  houseno,
  apartment_name,
  street_details,
  password,
}: PersonalInfoTypes) => {
  switch (step) {
    case 'personal_info_user': {
      if (
        validator.isEmpty(apartment_name) ||
        validator.isEmpty(houseno) ||
        validator.isEmpty(street_details)
      ) {
        return returnError(
          'ERR_EMPTY_FIELDS',
          true,
          'Fill the fields.',
          'All fields market with an asterisk (*) are required.',
        );
      } else {
        return noError();
      }
    }
    case 'personal_info': {
      if (
        validator.isEmpty(name) ||
        validator.isEmpty(lastname) ||
        validator.isEmpty(apartment_name) ||
        validator.isEmpty(houseno) ||
        validator.isEmpty(street_details) ||
        mobile_number == ''
      ) {
        return returnError(
          'ERR_EMPTY_FIELDS',
          true,
          'Fill the fields.',
          'All fields market with an asterisk (*) are required.',
        );
      } else if (mobile_number.length < 7)
        return returnError(
          'ERR_INCORRECT_PHONE_NUMBER',
          true,
          'Mobile Number',
          'Incorrect phone number',
        );
      else {
        return noError();
      }
    }
    case 'log_in': {
      if (mobile_number.length < 7)
        return returnError(
          'ERR_INCORRECT_PHONE_NUMBER',
          true,
          'Mobile Number',
          'Incorrect phone number',
        );
      if (validator.isEmpty(mobile_number) || validator.isEmpty(password)) {
        return returnError(
          'ERR_EMPTY_FIELDS',
          true,
          'Fill the fields.',
          'All fields market with an asterisk (*) are required.',
        );
      } else {
        return noError();
      }
    }
    default:
      return noError();
  }
};
const validate = ({
  step,
  phone_number,
  password,
  confirm_password,
  otp_code,
  name,
  lastname,
  apartment_name,
  houseno,
  street_details,
}: any) => {
  switch (step) {
    case USER_INFO:
      if (
        validator.isEmpty(name) ||
        validator.isEmpty(lastname) ||
        validator.isEmpty(apartment_name) ||
        validator.isEmpty(houseno) ||
        validator.isEmpty(street_details)
      ) {
        return returnError(
          'ERR_EMPTY_FIELDS',
          true,
          'Fill the fields.',
          'All fields market with an asterisk (*) are required.',
        );
      }
      return noError();
    case WITH_OTP:
      if (validator.isEmpty(phone_number))
        return returnError(
          'ERR_EMPTY_PHONE_NUMBER',
          true,
          'Mobile Number',
          'To complete this task, we need you to fill in all required fields.',
        );
      else if (phone_number.length < 7)
        return returnError(
          'ERR_INCORRECT_PHONE_NUMBER',
          true,
          'Mobile Number',
          'Incorrect phone number',
        );
      else return noError();
    case PHONE_VERIFICATION:
      if (validator.isEmpty(phone_number))
        return returnError(
          'ERR_EMPTY_PHONE_NUMBER',
          true,
          'Mobile Number',
          'To complete this task, we need you to fill in all required fields.',
        );
      else if (phone_number.length < 7)
       
        return returnError(
          'ERR_INCORRECT_PHONE_NUMBER',
          true,
          'Mobile Number',
          'Incorrect phone number',
        );
      else if (validator.isEmpty(password) || password.length < 6)
        return returnError(
          'ERR_6DIGITS_PHONE_NUMBER',
          true,
          'Password',
          'Enter a correct password, it must be at least 6 digits',
        );
      else if (
        validator.isEmpty(confirm_password) ||
        password !== confirm_password
      )
        return returnError(
          'ERR_MUST_MATCH_PASSWORD',
          true,
          'Confirm Password',
          'Passwords must match',
        );
      else return noError();
    case 'otp_verification':
      if (validator.isEmpty(otp_code)) {
        return returnError(
          'ERR_EMPTY_PHONE_NUMBER',
          true,
          'Mobile Number',
          'To complete this task, we need you to fill in all required fields.',
        );
      } else if (otp_code.length < 6) {
        return returnError(
          'ERR_6DIGITS_OTPCODE',
          true,
          'OTP Code',
          'Enter a OTP Code, it must be at least 6 digits',
        );
      } else {
        return noError();
      }
    default:
      return noError()
  }
};
export default validate;
