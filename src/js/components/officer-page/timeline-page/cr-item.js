import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import {
  crTextStyle, crNumberStyle, dateStyle, categoryStyle, findingStyle, subcategoryStyle, coaccusedStyle,
  documentIconStyle, audioIconStyle
} from './cr-item.style';


class CrItem extends Component {
  render() {
    const { hovering, item } = this.props;
    const { crid, date, category, finding, subcategory, coaccused, hasDocument, hasAudio } = item;
    return (
      <div>
        <div>
          <span style={ crTextStyle }>CR <span style={ crNumberStyle }>{ crid }</span></span>
          <span style={ dateStyle }>{ date }</span>
        </div>
        <div style={ categoryStyle(hovering) }>{ category }</div>
        <div style={ subcategoryStyle(hovering) }>{ subcategory }</div>
        <div>
          <span style={ findingStyle }>{ finding }</span>
        </div>
        <div>
          <span style={ coaccusedStyle }>1 of { coaccused } Coaccused</span>
          { hasDocument ? <span style={ documentIconStyle }/> : null }
          { hasAudio ? <span style={ audioIconStyle }/> : null }
        </div>
      </div>
    );
  }
}

CrItem.propTypes = {
  hovering: PropTypes.bool,
  item: PropTypes.object
};

export default Hoverable(CrItem);
