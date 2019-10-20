import {GET_CURRENCIES, FAILED_TO_GET_CURRENCIES, GET_CALCULATED_RATES, FAILED_TO_GET_CALCULATED_RATES} from '../action-types/index';
import initialState from '../store/initialState';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CURRENCIES:
      return {
        ...state,
       currencies: payload,
      };
    case FAILED_TO_GET_CURRENCIES:
      return {
        ...state,
        error: payload,
      };
    case GET_CALCULATED_RATES:
      return {
        ...state,
        rates: payload,
      };
    case FAILED_TO_GET_CALCULATED_RATES:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
