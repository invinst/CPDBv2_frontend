import React, { Component, PropTypes } from 'react';

import { wrapperStyle, } from './trr-detail.style';
import Row from './row';
import Demographic from 'components/common/demographics';


export default class TRRDetail extends Component {
  render() {
    const { subjectDemographic, category, forceTypes } = this.props;
    return (
      <div style={ wrapperStyle }>
        <Row drawBorder={ true } title='SUBJECT' borderValue={ !!subjectDemographic }>
          { subjectDemographic && <Demographic persons={ [subjectDemographic] }/> }
        </Row>
        <Row drawBorder={ true } title='FORCE CATEGORY'>{ category }</Row>
        <Row title='TYPES OF FORCE'>{ forceTypes ? forceTypes.join(' ← ') : '' }</Row>
      </div>
    );
  }
}

TRRDetail.propTypes = {
  subjectDemographic: PropTypes.string,
  category: PropTypes.string,
  forceTypes: PropTypes.arrayOf(PropTypes.string),
};
