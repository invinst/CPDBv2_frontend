import { imgUrl } from '../../../utils/static-assets';
import React, { PropTypes } from 'react';
import Hoverable from 'components/common/higher-order/hoverable';
import { arrowStyle, arrowWrapperStyle } from './carousel-arrow.style';

class Arrow extends React.Component {
  render() {
    const { side, clickHandler, hovering } = this.props;
    return (
      <div className={ 'test--carousel--arrow--' + side } style={ arrowWrapperStyle(side) }
        onClick={ e => clickHandler(side) }>
        { hovering ? (
          <img src={ imgUrl('disclosure-indicator-blue.svg') } style={ arrowStyle(side) }/>
        ) : (
          <img src={ imgUrl('disclosure-indicator.svg') } style={ arrowStyle(side) }/>
        ) }
      </div>
    );
  }
}

Arrow.propTypes = {
  hovering: PropTypes.bool,
  side: PropTypes.string,
  clickHandler: PropTypes.func
};

export default Hoverable(Arrow);
