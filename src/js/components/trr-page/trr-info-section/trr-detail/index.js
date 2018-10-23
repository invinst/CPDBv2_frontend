import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import { wrapperStyle, } from './trr-detail.style';
import Row from './row';
import Demographic from 'components/common/demographics';
import { POPUP_NAMES } from 'utils/constants';


export default class TRRDetail extends Component {
  render() {
    const { subjectDemographic, category, forceTypes, popup, pathName } = this.props;
    return (
      <div style={ wrapperStyle }>
        <Row drawBorder={ true } title='SUBJECT' borderValue={ !!subjectDemographic }>
          { subjectDemographic && <Demographic persons={ [subjectDemographic] } /> }
        </Row>
        <Row
          drawBorder={ true }
          title='FORCE CATEGORY'
          popup={ get(popup, POPUP_NAMES.TRR.FORCE_CATEGORY) }
          pathName={ pathName }
        >
          { category }
        </Row>
        <Row
          title='TYPES OF FORCE'
          popup={ get(popup, POPUP_NAMES.TRR.TYPES_OF_FORCE) }
          pathName={ pathName }
        >
          { forceTypes ? forceTypes.join(' ← ') : '' }
        </Row>
      </div>
    );
  }
}

TRRDetail.propTypes = {
  subjectDemographic: PropTypes.string,
  category: PropTypes.string,
  forceTypes: PropTypes.arrayOf(PropTypes.string),
  popup: PropTypes.object,
  pathName: PropTypes.string,
};
