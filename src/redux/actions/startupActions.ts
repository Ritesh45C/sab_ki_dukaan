import { ErrorHandler } from "types/General";
export const STARTUP = 'STARTUP';
export const STARTUP_LOADING = 'STARTUP_LOADING'
export const STARTUP_FAILURE = 'STARTUP_FAILURE'
export const STARTUP_SUCCESS = 'STARTUP_SUCCESS'

export const startup = () => ({
  type: STARTUP,
});
export const startupLoading = () => ({
  type: STARTUP_LOADING,
});

export const startupFailure = (error : ErrorHandler) => ({
  type: STARTUP_FAILURE,
  errorMessage: error,
});

export const startupSuccess = () => ({
  type: STARTUP_SUCCESS
})