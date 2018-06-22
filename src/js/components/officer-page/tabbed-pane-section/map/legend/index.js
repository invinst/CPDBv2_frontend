import React, { Component, PropTypes } from 'react';
import { brightOrangeTwoColor, champagneColor, clayGray, greyishColor } from 'utils/styles';
import { wrapperStyle, } from './legend.style';

import Row from './row';


export default class Legend extends Component {

  render() {
    const { legend } = this.props;
    return (
      <div style={ wrapperStyle } className='test--legend'>
        <Row
          ovalColor='white'
          ovalBorderColor={ brightOrangeTwoColor }
          text='Unsustained Complaint'
          number={ legend.unsustainedCount }
        />
        <Row
          ovalColor={ champagneColor }
          ovalBorderColor={ brightOrangeTwoColor }
          text='Sustained Allegation'
          number={ legend.sustainedCount }
        />
        <Row
          ovalColor={ greyishColor }
          ovalBorderColor={ clayGray }
          text='Use of Force Report'
          number={ legend.useOfForceCount }
        />
      </div>
    );
  }
}

Legend.propTypes = {
  legend: PropTypes.shape({
    unsustainedCount: PropTypes.number,
    sustainedCount: PropTypes.number,
    useOfForceCount: PropTypes.number
  }),
};

Legend.defaultProps = {
  legend: {
    unsustainedCount: 0,
    sustainedCount: 0,
    useOfForceCount: 0
  },
};
