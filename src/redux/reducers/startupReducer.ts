import {STARTUP_LOADING, STARTUP_FAILURE, STARTUP_SUCCESS} from '../actions/startupActions';
import {ErrorHandler} from 'types/General';

interface startupTypes {
  startupErrorMessage: ErrorHandler | null;
  startupIsLoading: boolean;
}
const INITIAL_STATE: startupTypes = {
  startupErrorMessage: null,
  startupIsLoading: false,
};

const reducer = (state = INITIAL_STATE, {type, errorMessage}: any) => {
  switch (type) {
    case STARTUP_LOADING:
      return {
        ...state,
        startupIsLoading: true,
        startupErrorMessage: null,
      };
      case STARTUP_SUCCESS:
        return {
          ...state,
          startupIsLoading: false,
          startupErrorMessage: null,
        };
    case STARTUP_FAILURE:
      return {
        ...state,
        startupIsLoading: false,
        startupErrorMessage: errorMessage,
      };
    default:
      return state;
  }
};

export default reducer;
