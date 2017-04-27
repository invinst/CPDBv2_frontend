import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import {
  crTextStyle, crNumberStyle, dateStyle, categoryStyle, findingStyle, subcategoryStyle, coaccusedStyle,
  documentIconStyle, audioIconStyle, wrapperStyle
} from './cr-item.style';


export class CRItem extends Component {
  render() {
    const { hovering, item, flashRatio, onClick } = this.props;
    const { crid, date, category, finding, subcategory, coaccused, hasDocument, hasAudio } = item;
    return (
      <div style={ wrapperStyle } onClick={ () => onClick(crid) }>
        <div>
          <span style={ crTextStyle }>CR <span style={ crNumberStyle }>{ crid }</span></span>
          <span style={ dateStyle }>{ date }</span>
        </div>
        <div style={ categoryStyle(hovering, flashRatio) } >
          { category }
        </div>
        <div style={ subcategoryStyle(hovering) }>{ subcategory }</div>
        <div>
          <span style={ findingStyle }>{ finding }</span>
        </div>
        <div>
          <span style={ coaccusedStyle }>1 of { coaccused } Coaccused</span>
          { hasDocument ? <span className='test--document-icon' style={ documentIconStyle }/> : null }
          { hasAudio ? <span className='test--audio-icon' style={ audioIconStyle }/> : null }
        </div>
      </div>
    );
  }
}

CRItem.propTypes = {
  hovering: PropTypes.bool,
  item: PropTypes.object,
  flashRatio: PropTypes.number,
  onClick: PropTypes.func
};

CRItem.defaultProps = {
  item: {}
};

export default Hoverable(CRItem);
