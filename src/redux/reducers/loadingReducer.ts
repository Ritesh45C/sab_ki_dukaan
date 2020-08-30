import { Action } from "redux";

export interface InitialState {
  loading:Boolean
}

export const initialState: InitialState = {
  loading: false,
};

const loadingReducer = (state = initialState, action:Action) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|LOADING|SUCCESS|FAILURE)/.exec(type);

  // ignore actions not containing *_REQUEST / *_LOADING / *_SUCCESS /  *_FAILURE
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  // *ACTION_NAME*_REQUEST = true
  // *ACTION_NAME*_SUCCESS = false
  // *ACTION_NAME*_FAILURE = false
  return {
    ...state,
    loading: requestState === 'REQUEST' || requestState === 'LOADING',
    [requestName]: requestState === 'REQUEST' || requestState === 'LOADING',
  };
};

export default loadingReducer;
