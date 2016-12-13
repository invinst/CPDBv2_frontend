import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import Link from 'components/common/react-router-link';
import { STORIES_PATH } from 'utils/constants';
import { loadMoreStyle, loadMoreHoverStyle } from './load-more.style';


class LoadMore extends Component {
  render() {
    const { hovering } = this.props;

    return (
      <Link to={ `/${STORIES_PATH}` } style={ hovering ? loadMoreHoverStyle : loadMoreStyle }>More</Link>
    );
  }
}

LoadMore.propTypes = {
  hovering: PropTypes.bool
};

export default Hoverable(LoadMore);
