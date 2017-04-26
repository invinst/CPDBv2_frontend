import Mousetrap from 'mousetrap';

let _map = {};

function _keyExists(key) {
  return _map[key] && _map[key].length > 0;
}

export function bind(key, callback) {
  _map[key] = _keyExists(key) ? [callback, ..._map[key]] : [callback];
  Mousetrap.bind(key, callback);
}

export function unbind(key) {
  _map[key] = _keyExists(key) ? _map[key].slice(1) : undefined;

  if (_keyExists(key)) {
    Mousetrap.bind(key, _map[key][0]);
  } else {
    Mousetrap.unbind(key);
  }
}

export function reset() {
  _map = {};
}
