"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRootState = exports.rootDispatch = exports.debounceRootDispatch = exports.initRootStore = void 0;
var lodash_1 = require("lodash");
// create singleton instance
var IMMUTABLE_TOKEN = "$immutableStore";
var _debounceDispatchers = [];
function _dispatch(store, type, payload) {
    store.dispatch(function (dispatch) {
        dispatch({
            type: type,
            payload: payload,
        });
    });
}
function initRootStore(store) {
    window[IMMUTABLE_TOKEN] = store;
}
exports.initRootStore = initRootStore;
function debounceRootDispatch(type, payload, wait) {
    if (wait === void 0) { wait = 2000; }
    var store = window[IMMUTABLE_TOKEN];
    if (store != null) {
        var dispatcher = _debounceDispatchers.find(function (d) { return d.type === type; });
        if (dispatcher == null) {
            dispatcher = {
                type: type,
                dispatch: lodash_1.debounce(_dispatch, wait),
            };
            _debounceDispatchers.push(dispatcher);
        }
        dispatcher.dispatch(store, type, payload);
    }
}
exports.debounceRootDispatch = debounceRootDispatch;
function rootDispatch(type, payload) {
    var store = window[IMMUTABLE_TOKEN];
    if (store != null) {
        _dispatch(store, type, payload);
    }
}
exports.rootDispatch = rootDispatch;
function getRootState() {
    var store = window[IMMUTABLE_TOKEN];
    if (store == null) {
        return null;
    }
    return store.getState();
}
exports.getRootState = getRootState;
//# sourceMappingURL=ImmutableStore.js.map