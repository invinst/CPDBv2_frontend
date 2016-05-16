import React, { PropTypes } from 'react';

import ExpandTransition from 'components/animation/expand-transition';
import { TOP, BOTTOM } from 'utils/constants';


export default function Expandable(ComposedComponent, props) {
  class ExpandableComponent extends React.Component {
    renderAnimation() {
      return (
        <ExpandTransition
          childKey={ this.props.childKey }
          onFullyClosed={ this.props.onFullyClosed }
          onExpansionBegin={ this.props.onExpansionBegin }>
          <ComposedComponent {...props}/>
        </ExpandTransition>
      );
    }

    render() {
      if (this.props.expandDirection === TOP) {
        return (
          <div>
            { this.renderAnimation() }
            { this.props.children }
          </div>
        );
      } else if (this.props.expandDirection === BOTTOM) {
        return (
          <div>
            { this.props.children }
            { this.renderAnimation() }
          </div>
        );
      }
    }
  }

  ExpandableComponent.propTypes = {
    children: PropTypes.node,
    expandDirection: PropTypes.string,
    childKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onExpansionBegin: PropTypes.func,
    onFullyClosed: PropTypes.func
  };

  ExpandableComponent.defaultProps = {
    expandDirection: BOTTOM
  };

  return ExpandableComponent;
}
