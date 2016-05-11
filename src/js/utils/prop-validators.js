export function arrayOfN(n) {
  return (props, propName, componentName) => {
    if ( props[propName].length !== n ) {
      return new Error(`${propName} must be an array of exactly ${n} elements.`);
    }
  };
}

export function listOfN(n) {
  return (props, propName, componentName) => {
    if ( props[propName].size !== n ) {
      return new Error(`${propName} must be an list of exactly ${n} elements.`);
    }
  };
}
