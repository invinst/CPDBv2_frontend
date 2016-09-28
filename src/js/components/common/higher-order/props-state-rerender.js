import { isEqual } from 'lodash';


export default function (SubComponent) {
  return class PropsStateRerender extends SubComponent {
    shouldComponentUpdate(nextProps, nextState) {
      return !isEqual(this.state, nextState) || !isEqual(this.props, nextProps);
    }
  };
}
