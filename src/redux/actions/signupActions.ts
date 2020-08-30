import {AuthDataHandlerProps, inputType} from 'types/Auth';

// ACTIONS
export const INPUT_HANDLER = 'INPUT_HANDLER';
export const INPUT_HANDLER_REQ = 'INPUT_HANDLER_REQ';
// REDUCER
export const AUTH_DATA_HANDLER = 'AUTH_DATA_HANDLER';
export const AUTH_DATA = 'AUTH_DATA';
export const USER_INFO = 'USER_INFO';
export const PHONE_VERIFICATION = 'PHONE_VERIFICATION';
export const WITH_OTP = 'WITH_OTP'
export const LOG_IN = 'LOG_IN';

export const authDataHandler = (field:AuthDataHandlerProps['field'], payload: AuthDataHandlerProps['payload']) => ({
  type: AUTH_DATA_HANDLER,
  field: field,
  authDataPayload: payload,
});

export const inputHandler = (payload: inputType, step: string) => ({
  type: INPUT_HANDLER,
  input: payload,
  step: step,
});
export const inputHandlerRequest = () => ({
  type: INPUT_HANDLER_REQ,
});
