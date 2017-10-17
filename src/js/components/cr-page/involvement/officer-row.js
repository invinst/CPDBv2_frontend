import React, { Component, PropTypes } from 'react';

import LabeledIcon from 'components/common/labeled-icon';
import Hoverable from 'components/common/higher-order/hoverable';
import { wrapperStyle } from './officer-row.style';


class OfficerRow extends Component {
  render() {
    const { officerId, abbrName, extraInfo, onClick, style, hovering } = this.props;

    return (
      <div className='test--officer-row' style={ { ...wrapperStyle, ...style } } onClick={ () => onClick(officerId) }>
        <LabeledIcon label={ abbrName } sublabel={ extraInfo } hovering={ hovering }/>
      </div>
    );
  }
}

OfficerRow.propTypes = {
  officerId: PropTypes.number,
  abbrName: PropTypes.string,
  extraInfo: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  hovering: PropTypes.bool
};

export default Hoverable(OfficerRow);
