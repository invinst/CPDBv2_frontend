import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {innerHeight} from 'utils/dom';
import {TransitionMotion, spring} from 'react-motion';


export default class ExpandTransition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childHeight: null,
      prevKey: null
    };
  }

  render() {
    if (this.props.childKey && this.props.childKey !== this.state.prevKey) {
      // calculate child height when just received a new child
      const ref = component => {
        if (component) {
          this.setState({
            childHeight: innerHeight(ReactDOM.findDOMNode(component)),
            prevKey: this.props.childKey
          });
        }
      };
      return React.cloneElement(this.props.children, {ref: ref, style: {height: 0}});
    } else {

      // interpolate height on subsequent renders
      return (
        <TransitionMotion
          willLeave={ () => ({height: spring(0)}) }
          defaultStyles={ this.props.childKey ? [{key: this.props.childKey + '', style: {height: 0}}] : [] }
          styles={ this.props.childKey ?
            [{key: this.props.childKey + '', style: {height: spring(this.state.childHeight)}}]
            : [] }>
          { (interpolatedStyles) => {
            let config = interpolatedStyles[0];
            if (config) {
              return React.cloneElement(this.props.children, {style: config.style});
            }
            return null;
          } }
        </TransitionMotion>
      );
    }
  }
}

ExpandTransition.propTypes = {
  // children must be one element only and must merge props.style that is passed down to it
  children: PropTypes.element.isRequired,

  // childKey must be unique to children, childKey is null mean nothing will be rendered.
  childKey: PropTypes.number
};
