import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import style from './trr-page.sass';
import OfficerSection from './officer-section';
import TRRInfoSection from './trr-info-section';
import FooterContainer from 'containers/footer-container';
import responsiveContainerStyles from 'components/common/responsive-container.sass';
import Printable from 'components/common/higher-order/printable';
import PrintNotes from 'components/common/print-notes';
import PrintPreloadFonts from 'components/common/print-preload-fonts';


export function TRRPage(props, context) {
  const {
    trrId, officer, trrLocation, trrDetail, trrDocument,
    openRequestTRRDocumentModal, popup, pathName, notes,
    noAttachmentTextEditWrapperStateProps,
  } = props;
  const { printMode } = context;

  return (
    <React.Fragment>
      <Helmet>
        <title>{ `TRR ${trrId}` }</title>
      </Helmet>
      <div className={ style.trrPage }>
        <ShareableHeaderContainer/>
        <div className={ `${responsiveContainerStyles.responsiveContainer} trr-content` }>
          <h1 className='trr-title no-print'>TRR { trrId }</h1>
          { printMode ? <div className='trr-category-print'>{ trrDetail.category }</div> : null }
          {
            printMode ? (
              <div className='incident-date-print'>
                <h3 className='incident-date-title-print'>DATE OF INCIDENT</h3>
                <div className='incident-date-value-print'>{ trrLocation.incidentDate }</div>
              </div>
            ) : null
          }
          <OfficerSection officer={ officer }/>
          <TRRInfoSection
            trrLocation={ trrLocation }
            trrDetail={ trrDetail }
            trrDocument={ trrDocument }
            openRequestTRRDocumentModal={ openRequestTRRDocumentModal }
            popup={ popup }
            pathName={ pathName }
            noAttachmentTextEditWrapperStateProps={ noAttachmentTextEditWrapperStateProps }
          />
        </div>
        <PrintNotes notes={ notes }/>
        <FooterContainer/>
        <PrintPreloadFonts/>
      </div>
    </React.Fragment>
  );
}

TRRPage.propTypes = {
  trrId: PropTypes.string,
  officer: PropTypes.object,
  trrLocation: PropTypes.object,
  trrDetail: PropTypes.object,
  trrDocument: PropTypes.object,
  openRequestTRRDocumentModal: PropTypes.func,
  popup: PropTypes.object,
  pathName: PropTypes.string,
  notes: PropTypes.array,
  noAttachmentTextEditWrapperStateProps: PropTypes.object,
};

TRRPage.contextTypes = {
  printMode: PropTypes.bool,
};

export default Printable(TRRPage);
