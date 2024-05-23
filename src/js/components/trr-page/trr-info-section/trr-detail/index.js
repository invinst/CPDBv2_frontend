import PropTypes from 'prop-types';
import React from 'react';
import { get } from 'lodash';

import style from './trr-detail.sass';
import Row from './row';
import Demographic from 'components/common/demographics';
import { POPUP_NAMES } from 'utils/constants';


export default function TRRDetail(props) {
  const { subjectDemographic, category, popup, pathName, actions } = props;
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

TRRDetail.propTypes = {
  subjectDemographic: PropTypes.string,
  category: PropTypes.string,
  forceTypes: PropTypes.arrayOf(PropTypes.string),
  popup: PropTypes.object,
  pathName: PropTypes.string,
};
