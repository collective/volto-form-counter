import { RESET_COUNTER, GET_COUNTER } from 'volto-form-counter/actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  subrequests: {},
};

/**
 * resetCounter reducer.
 * @function resetCounterState
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export const resetCounterState = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${RESET_COUNTER}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${RESET_COUNTER}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      };
    case `${RESET_COUNTER}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
};

/**
 * getCounter reducer.
 * @function counterValueState
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export const counterValueState = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_COUNTER}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_COUNTER}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        error: null,
        loaded: true,
        loading: false,
      };
    case `${GET_COUNTER}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
};
