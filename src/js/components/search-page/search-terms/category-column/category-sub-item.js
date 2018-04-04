import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { subItemStyle } from './category-sub-item.style';


class CategorySubItem extends Component {

  render() {
    const { hovering } = this.props;
    return (
      <div className='test--search-sub-item' style={ subItemStyle(hovering) }>
        { this.props.title }
      </div>
    );
  }
}

CategorySubItem.defaultProps = {
  hovering: false
};

CategorySubItem.propTypes = {
  title: PropTypes.string.isRequired,
  hovering: PropTypes.bool
};

export default Hoverable(CategorySubItem);
