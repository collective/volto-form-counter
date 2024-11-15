import { expandToBackendURL } from '@plone/volto/helpers';

/**
 * resetCounter action
 * @module actions/resetCounter
 */
export const RESET_COUNTER = 'RESET_COUNTER';

export function resetCounter({ path }) {
  const pagePath = expandToBackendURL(path);

  return {
    type: RESET_COUNTER,
    request: {
      op: 'patch',
      path: `${path}@reset-counter`,
    },
  };
}
