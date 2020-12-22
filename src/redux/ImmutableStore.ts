import { debounce } from "lodash";

// create singleton instance
const IMMUTABLE_TOKEN = "$immutableStore";
const _debounceDispatchers = [];

function _dispatch(store, type, payload) {
  store.dispatch((dispatch) => {
    dispatch({
      type: type,
      payload: payload,
    });
  });
}

export function initRootStore(store) {
  window[IMMUTABLE_TOKEN] = store;
}

export function debounceRootDispatch(type, payload, wait = 2000) {
  const store = window[IMMUTABLE_TOKEN];

  if (store != null) {
    let dispatcher = _debounceDispatchers.find((d) => d.type === type);
    if (dispatcher == null) {
      dispatcher = {
        type: type,
        dispatch: debounce(_dispatch, wait),
      };

      _debounceDispatchers.push(dispatcher);
    }

    dispatcher.dispatch(store, type, payload);
  }
}

export function rootDispatch(type, payload) {
  const store = window[IMMUTABLE_TOKEN];

  if (store != null) {
    _dispatch(store, type, payload);
  }
}

export function getRootState() {
  const store = window[IMMUTABLE_TOKEN];

  if (store == null) {
    return null;
  }

  return store.getState();
}
