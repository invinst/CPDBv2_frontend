import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';

import { wrapperStyle, titleStyle, itemTitleStyle, iconStyle, itemTitleWithBorderStyle } from './attachments.style';

export default class Attachments extends Component {
  render() {
    const { title, items, iconName } = this.props;
    if (!items || items.length == 0) {
      return null;
    }
    const lastItemIndex = items.length - 1;
    return (
      <div style={ wrapperStyle }>
        <span style={ titleStyle } className='test--attachment-section-title'>{ title }</span>
        { map(items, (item, index) => (
          <div key={ index }>
            <i style={ iconStyle(iconName) }/>
            <a style={ index === lastItemIndex ? itemTitleStyle : itemTitleWithBorderStyle } href={ item.url }>
              { item.title }
            </a>
          </div>
        )) }
      </div>
    );
  }
}

Attachments.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.string,
  items: PropTypes.array
};
