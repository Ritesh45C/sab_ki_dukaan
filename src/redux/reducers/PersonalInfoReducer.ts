import {INPUT_HANDLER, INPUT_HANDLER_REQ} from '../actions/personalInfoActions';

export interface PersonalInfoTypes {
  personal_info: {
    name: string;
    lastname: string;
    mobile_number: number | string;
    houseno:number | string;
    apartment_name: number | string;
    street_details: string;
    landmark:string;
  };
  isUpdating: boolean;
}
const INITIAL_STATE: PersonalInfoTypes = {
  personal_info: {
    name:'',
    lastname: '',
    mobile_number: '',
    houseno:'',
    apartment_name: '',
    street_details:'',
    landmark:'',
  },
  isUpdating: false,
};

const reducer = (state = INITIAL_STATE, {type, input, step}: any) => {
  switch (type) {
    case INPUT_HANDLER:
      switch (step) {
        case 'personal_info':
          return {
            ...state,
            personal_info: {
              ...state.personal_info,
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
