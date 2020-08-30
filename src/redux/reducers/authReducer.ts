
  import {
    USER_DATA_LOADING,
    USER_DATA_SUCCESS,
    USER_DATA_FAILURE,
  } from '../actions/authActions';
  
  import {userDataType} from 'types/Auth'

  interface StateTypes  {
      userData: userDataType | null
      userDataErrorMessage: string | null
      userDataIsLoading: boolean
  }
  const INITIAL_STATE: StateTypes = {
    userData: null,
    userDataErrorMessage: null,
    userDataIsLoading: false,

  };
  
  const reducer = (state = INITIAL_STATE, { type, userData, errorMessage, input } :any)  => {
    switch (type) {
      case USER_DATA_LOADING:
        return {
          ...state,
          userDataIsLoading: true,
          userDataErrorMessage: '',
        };
  
      case USER_DATA_SUCCESS:
        return {
          ...state,
          userData: Object.keys(userData).map(k => userData[k]),
          userDataIsLoading: false,
          userDataErrorMessage: null,
        };
  
      case USER_DATA_FAILURE:
        return {
          ...state,
          userData: {},
          userDataIsLoading: false,
          userDataErrorMessage: errorMessage,
        };
      default:
        return state;
    }
  };
  
  export default reducer;