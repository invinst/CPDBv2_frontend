import React, { PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { buttonStyle } from './arrow.style';

class Arrow extends React.Component {
  render() {
    const { direction, onClick, show, hovering } = this.props;
    if (!show) return null;
    return (
      <button
        className={ `test--carousel--arrow--${direction}` }
        style={ buttonStyle(direction, hovering) }
        onClick={ () => onClick(direction) }/>
    );
  }
}

Arrow.propTypes = {
  hovering: PropTypes.bool,
  direction: PropTypes.string,
  show: PropTypes.bool,
  onClick: PropTypes.func
};

export default Hoverable(Arrow);
export { arrowWidth } from './arrow.style';
