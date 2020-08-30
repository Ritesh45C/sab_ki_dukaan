export const USER_DATA_REQUEST = 'USER_DATA_REQUEST';
export const USER_DATA_LOADING = 'USER_DATA_LOADING';
export const USER_DATA_SUCCESS = 'USER_DATA_SUCCESS';
export const USER_DATA_FAILURE = 'USER_DATA_FAILURE';
export const INPUT_HANDLER = 'INPUT_HANDLER'

interface inputType {
    name: string,
    value: string
}

export const handleInput = (payload: inputType) => ({
    type:INPUT_HANDLER,
    input: payload
})

export const fetchUserData = () => ({
  type: USER_DATA_REQUEST,
});

export const fetchUserDataLoading = () => ({
  type: USER_DATA_LOADING,
});

export const fetchUserDataSuccess = (payload: any) => ({
  type: USER_DATA_SUCCESS,
  userData: payload,
});

export const fetchUserDataFailure = (payload: any) => ({
  type: USER_DATA_FAILURE,
  errorMessage: payload,
});


