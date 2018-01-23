import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Hoverable from 'components/common/higher-order/hoverable';
import { loadMoreButtonStyle, loadMoreButtonTextStyle } from './load-more-button.style';
import * as LayeredKeyBinding from 'utils/layered-key-binding';


class LoadMoreButton extends Component {
  componentDidMount() {
    const { onLoadMore, header } = this.props;
    LayeredKeyBinding.bind('enter', onLoadMore.bind(null, header));
  }

  render() {
    const { onLoadMore, hovering, header, isFocused } = this.props;

    return (
      <div
        className={ classnames('link--transition test--load-more-button', { 'test--focused': isFocused }) }
        style={ loadMoreButtonStyle(hovering, isFocused) }
        onClick={ onLoadMore.bind(null, header) }>
        <div style={ loadMoreButtonTextStyle(hovering, isFocused) }>More</div>
      </div>
    );
  }
}


LoadMoreButton.propTypes = {
  onLoadMore: PropTypes.func,
  header: PropTypes.string,
  hovering: PropTypes.bool,
  isFocused: PropTypes.bool,
};

LoadMoreButton.defaultProps = {
  onLoadMore: function () {}
};

export default Hoverable(LoadMoreButton);
