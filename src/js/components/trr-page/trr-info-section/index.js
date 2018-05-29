import React, { Component, PropTypes } from 'react';

import {
  wrapperStyle,
} from './trr-info-section.style';
import TRRDetail from './trr-detail';
import TRRDocument from './trr-document';
import TRRLocation from './trr-location';


export default class TRRInfoSection extends Component {
  render() {
    const { trrLocation, trrDetail, trrDocument, openRequestTRRDocumentModal } = this.props;
    return (
      <div style={ wrapperStyle }>
        <TRRDetail { ...trrDetail } />
        <TRRDocument
          { ...trrDocument }
          openRequestTRRDocumentModal={ openRequestTRRDocumentModal }
        />
        <TRRLocation { ...trrLocation } />
      </div>
    );
  }
}

TRRInfoSection.propTypes = {
  trrLocation: PropTypes.shape({
    address: PropTypes.string,
    incidentDate: PropTypes.string,
    beat: PropTypes.string,
    locationType: PropTypes.string,
  }),
  trrDetail: PropTypes.shape({
    subjectDemographic: PropTypes.string,
    category: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.string),
  }),
  trrDocument: PropTypes.shape({
    alreadyRequested: PropTypes.bool,
  }),
  openRequestTRRDocumentModal: PropTypes.func,
};

TRRInfoSection.defaultProps = {
  openRequestTRRDocumentModal: () => {},
};
