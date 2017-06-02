import React, { Component, PropTypes } from 'react';
import Hoverable from 'components/common/higher-order/hoverable';
import { loadMoreButtonStyle, suggestionTextStyle } from './load-more-button.style';


class LoadMoreButton extends Component {
  render() {
    const { onLoadMore, hovering, header } = this.props;

    return (
      <div
        className='link--transition test--load-more-button'
        style={ loadMoreButtonStyle }
        onClick={ onLoadMore.bind(null, header) }>
        <div style={ suggestionTextStyle(hovering) }>Show more results</div>
      </div>
    );
  }
}


LoadMoreButton.propTypes = {
  onLoadMore: PropTypes.func,
  header: PropTypes.string,
  hovering: PropTypes.bool
};

export default Hoverable(LoadMoreButton);
