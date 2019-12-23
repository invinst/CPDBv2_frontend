import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Hoverable from 'components/common/higher-order/hoverable';
import { loadMoreButtonStyle, loadMoreButtonTextStyle } from './load-more-button.style';


function LoadMoreButton(props) {
  const { onLoadMore, hovering, header, isFocused } = props;

  return (
    <div
      className={ classnames('link--transition test--load-more-button', { 'test--focused': isFocused }) }
      style={ loadMoreButtonStyle(hovering, isFocused) }
      onClick={ onLoadMore.bind(null, header) }>
      <div style={ loadMoreButtonTextStyle(hovering, isFocused) }>More</div>
    </div>
  );
}


LoadMoreButton.propTypes = {
  onLoadMore: PropTypes.func,
  header: PropTypes.string,
  hovering: PropTypes.bool,
  isFocused: PropTypes.bool,
};

LoadMoreButton.defaultProps = {
  onLoadMore: function () {},
};

export default Hoverable(LoadMoreButton);
