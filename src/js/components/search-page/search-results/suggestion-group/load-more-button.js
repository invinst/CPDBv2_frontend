import React, { Component, PropTypes } from 'react';
import Hoverable from 'components/common/higher-order/hoverable';
import { loadMoreButtonStyle, loadMoreButtonTextStyle } from './load-more-button.style';


class LoadMoreButton extends Component {
  render() {
    const { onLoadMore, hovering, header } = this.props;

    return (
      <div
        className='link--transition test--load-more-button'
        style={ loadMoreButtonStyle }
        onClick={ onLoadMore.bind(null, header) }>
        <div style={ loadMoreButtonTextStyle(hovering) }>More</div>
      </div>
    );
  }
}


LoadMoreButton.propTypes = {
  onLoadMore: PropTypes.func,
  header: PropTypes.string,
  hovering: PropTypes.bool
};

LoadMoreButton.defaultProps = {
  onLoadMore: function () {}
};

export default Hoverable(LoadMoreButton);
