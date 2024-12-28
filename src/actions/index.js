// import { expandToBackendURL } from '@plone/volto/helpers';

export const RESET_COUNTER = 'RESET_COUNTER';
export const GET_COUNTER = 'GET_COUNTER';

/**
 * resetCounter action
 * @module actions/resetCounter
 */
export function resetCounter({ path, value }) {
  // const pagePath = expandToBackendURL(path);

  return {
    type: RESET_COUNTER,
    request: {
      op: 'patch',
      path: `${path}/@counter`,
      data: { counter_value: value },
    },
  };
}

/**
 * resetCounter action
 * @module actions/counter
 * Parameters: block_id (optional) — The identifier of the form block. The first available is being selected if not passed.
 */
export function getCounterValue({ path }) {
  // const pagePath = expandToBackendURL(path);

  return {
    type: GET_COUNTER,
    request: {
      op: 'get',
      path: `${path}/@counter`,
    },
  };
}
