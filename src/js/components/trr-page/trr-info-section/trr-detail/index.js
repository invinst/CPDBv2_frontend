import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import style from './trr-detail.sass';
import Row from './row';
import Demographic from 'components/common/demographics';
import { POPUP_NAMES } from 'utils/constants';


export default class TRRDetail extends Component {
  render() {
    const { subjectDemographic, category, forceTypes, popup, pathName } = this.props;
    return (
      <div className={ style.trrDetail }>
        <Row title='subject' twoRowsWhenPrint={ true } borderValue={ !!subjectDemographic }>
          { subjectDemographic && <Demographic persons={ [subjectDemographic] } /> }
        </Row>
        <Row
          title='force category'
          popup={ get(popup, POPUP_NAMES.TRR.FORCE_CATEGORY) }
          pathName={ pathName }
        >
          { category }
        </Row>
        <Row
          title='types of force'
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
