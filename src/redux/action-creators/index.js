
import axios from 'axios';
import {GET_CURRENCIES, FAILED_TO_GET_CURRENCIES, GET_CALCULATED_RATES, FAILED_TO_GET_CALCULATED_RATES} from '../action-types';


export const getCurrencies = () => async dispatch => {
  const URL = `${process.env.REACT_APP_API}/currencies`;
  try {
    const allCurrencies = await axios.get(
      URL,  {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    const { currencies} = allCurrencies.data;
    return dispatch({ type: GET_CURRENCIES, payload: currencies });
  } catch (error) {
    const { response } = error;
    return dispatch({ type: FAILED_TO_GET_CURRENCIES, payload: response });
  }
};

export const getCalculatedExchange = (baseRate, quoteRate, amount) => async dispatch => {
  const URL = `${process.env.REACT_APP_API}/rates/exchange`;
  try {
    const singleCalculateRate = await axios.post(
      URL, {
        baseRate, quoteRate, amount
      }
    );

    const { answer, exchangeRate} = singleCalculateRate.data;
    const localStorageData = [
      {
        id: Math.random(),
        amount,
      exchangeRate,
      answer,
      baseRate,
      quoteRate,
    }
    ];
    if (localStorage.key("history") === null){
      localStorage.setItem('history',  JSON.stringify(localStorageData))
      return dispatch({ type: GET_CALCULATED_RATES, payload: singleCalculateRate.data });
    }

    const currentData = JSON.parse(localStorage.getItem('history'))
    currentData.push({
      id: Math.random(),
      amount,
    exchangeRate,
    answer,
    baseRate,
    quoteRate,
  })

  localStorage.setItem('history', JSON.stringify(currentData))
    
    return dispatch({ type: GET_CALCULATED_RATES, payload: singleCalculateRate.data });
  } catch (error) {
    const { response } = error;
    return dispatch({ type: FAILED_TO_GET_CALCULATED_RATES, payload: response });
  }
};
