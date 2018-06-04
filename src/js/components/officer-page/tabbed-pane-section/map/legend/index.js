import React, { Component, PropTypes } from 'react';
import { brightOrangeTwoColor, champagneColor, clayGray, greyishColor } from 'utils/styles';
import { contentStyle, titleStyle, wrapperStyle, } from './legend.style';

import Row from './row';


export default class Legend extends Component {

  render() {
    const { legend } = this.props;
    return (
      <div style={ wrapperStyle } className='test--legend'>
        <div style={ titleStyle }>
          LEGEND
        </div>
        <div style={ contentStyle }>
          <Row
            ovalColor='white'
            ovalBorderColor={ brightOrangeTwoColor }
            text='Unsustained Complaint'
            number={ legend.allegationCount - legend.sustainedCount }
            haveMarginBottom={ true }
          />
          <Row
            ovalColor={ champagneColor }
            ovalBorderColor={ brightOrangeTwoColor }
            text='Sustained Allegation'
            number={ legend.sustainedCount }
            haveMarginBottom={ true }
          />
          <Row
            ovalColor={ greyishColor }
            ovalBorderColor={ clayGray }
            text='Use of Force Report'
            number={ legend.useOfForceCount }
            haveMarginBottom={ false }
          />
        </div>
      </div>
    );
  }
}

Legend.propTypes = {
  legend: PropTypes.shape({
    allegationCount: PropTypes.number,
    sustainedCount: PropTypes.number,
    useOfForceCount: PropTypes.number
  }),
};

Legend.defaultProps = {
  legend: {
    allegationCount: 0,
    sustainedCount: 0,
    useOfForceCount: 0
  },
};
