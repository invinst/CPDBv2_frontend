export function arrayOfN(n) {
  return (props, propName, componentName) => {
    if ( props[propName].length !== n ) {
      return new Error(`${propName} must be an array of exactly ${n} elements.`);
    }
  };
}
