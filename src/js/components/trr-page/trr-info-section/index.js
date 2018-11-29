import React, { Component, PropTypes } from 'react';

import style from './trr-info-section.sass';
import TRRDetail from './trr-detail';
import TRRDocument from './trr-document';
import TRRLocation from './trr-location';


export default class TRRInfoSection extends Component {
  render() {
    const { trrLocation, trrDetail, trrDocument, openRequestTRRDocumentModal, popup, pathName } = this.props;
    return (
      <div className={ style.trrInfoSection }>
        <TRRDetail { ...trrDetail } popup={ popup } pathName={ pathName }/>
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
    forceTypes: PropTypes.arrayOf(PropTypes.string),
  }),
  trrDocument: PropTypes.shape({
    alreadyRequested: PropTypes.bool,
  }),
  openRequestTRRDocumentModal: PropTypes.func,
  popup: PropTypes.object,
  pathName: PropTypes.string,
};

TRRInfoSection.defaultProps = {
  openRequestTRRDocumentModal: () => {},
};
