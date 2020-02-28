import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { get, isEmpty } from 'lodash';
import cx from 'classnames';

import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import FooterContainer from 'containers/footer-container';
import SummaryRow from './summary-row';
import Demographics from 'components/common/demographics';
import Timeline from './timeline';
import Location from './location';
import Involvement from './involvement';
import Attachments from './attachments';
import AccusedOfficers from './accused-officers';
import RelatedComplaints from './related-complaints';
import ComplaintCategory from 'components/cr-page/complaint-category';
import ComplaintIncidentDate from 'components/cr-page/complaint-incident-date';
import { PINNED_ITEM_TYPES, POPUP_NAMES } from 'utils/constants';
import Printable from 'components/common/higher-order/printable';
import PrintNotes from 'components/common/print-notes';
import PrintPreloadFonts from 'components/common/print-preload-fonts';
import { PrintModeContext } from 'contexts';
import ItemPinButton from 'components/common/item-pin-button';
import styles from './cr-page.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';
import shareableHeaderStyles from 'components/headers/shareable-header/shareable-header.sass';
import pinButtonStyles from 'components/common/item-pin-button.sass';


function CRPage(props) {
  const {
    crid, coaccused, complainants, alreadyRequested, category, subcategory,
    incidentDate, point, address, crLocation, beat, involvements, attachments,
    openRequestDocumentModal, summary, victims, startDate, endDate, popup, location: { pathname }, notes,
    noAttachmentTextEditWrapperStateProps, onTrackingAttachment, addOrRemoveItemInPinboard, isPinned,
  } = props;

  const { printMode } = useContext(PrintModeContext);
  const involvementItem = <Involvement involvements={ involvements }/>;

  return (
    <React.Fragment>
      <Helmet>
        <title>{ `CR ${crid}` }</title>
      </Helmet>
      <div className={ styles.crPage }>
        <ShareableHeaderContainer
          headerButtons={
            <ItemPinButton
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
              showHint={ false }
              className={ cx(shareableHeaderStyles.headerButton, pinButtonStyles.headerPinButton) }
              item={ {
                type: PINNED_ITEM_TYPES.CR,
                id: crid,
                isPinned,
                incidentDate,
                category,
              } }
            />
          }
        />
        <div className={ cx(responsiveContainerStyles.responsiveContainer, 'top-content') }>
          <h1 className='cr-title no-print'>CR { crid }</h1>
          <ComplaintCategory
            category={ category }
            subcategory={ subcategory }
          />
          <ComplaintIncidentDate incidentDate={ incidentDate }/>
          <AccusedOfficers
            officers={ coaccused }
            popup={ get(popup, POPUP_NAMES.COMPLAINT.ACCUSED_OFFICER) }
            pathName={ pathname }
            addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
          />
          <div className='complaint-info'>
            {
              victims.length > 0
                ? (
                  <SummaryRow label='VICTIM' className='test--victims'>
                    <Demographics persons={ victims } />
                  </SummaryRow>
                ) : null
            }
            {
              complainants.length > 0
                ? (
                  <SummaryRow label='COMPLAINANT' className='test--complainant'>
                    <Demographics persons={ complainants } />
                  </SummaryRow>
                ) : null
            }
            {
              summary
                ? (
                  <SummaryRow label='SUMMARY'>
                    <div className='cr-summary'>{ summary }</div>
                  </SummaryRow>
                ) : null
            }
            <Attachments
              items={ attachments }
              openRequestDocumentModal={ openRequestDocumentModal }
              onTrackingAttachment={ onTrackingAttachment }
              alreadyRequested={ alreadyRequested }
              pathname={ pathname }
              noAttachmentTextEditWrapperStateProps={ noAttachmentTextEditWrapperStateProps }
            />
            <div className='timeline-location-container'>
              <div className='investigation-timeline'>
                <Timeline startDate={ startDate } endDate={ endDate } incidentDate={ incidentDate }/>
                { printMode ? null : involvementItem }
              </div>
              <div className='cr-location'>
                <Location point={ point } address={ address } location={ crLocation } beat={ beat }/>
              </div>
              <div className='clearfix'/>
            </div>
            { printMode ? involvementItem : null }
            { printMode ? <div className='clearfix'/> : null }
            { printMode ? <PrintNotes notes={ notes } /> : null }
          </div>
        </div>
        { !isEmpty(address) ? <RelatedComplaints crid={ crid } /> : null }
        <FooterContainer className={ styles.crPageFooter }/>
        <PrintPreloadFonts/>
      </div>
    </React.Fragment>
  );
}

CRPage.propTypes = {
  crid: PropTypes.string,
  category: PropTypes.string,
  subcategory: PropTypes.string,
  coaccused: PropTypes.array,
  complainants: PropTypes.array,
  victims: PropTypes.array,
  incidentDate: PropTypes.string,
  summary: PropTypes.string,
  point: PropTypes.object,
  address: PropTypes.string,
  crLocation: PropTypes.string,
  beat: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  involvements: PropTypes.object,
  attachments: PropTypes.array,
  openRequestDocumentModal: PropTypes.func,
  alreadyRequested: PropTypes.bool,
  popup: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  notes: PropTypes.array,
  noAttachmentTextEditWrapperStateProps: PropTypes.object,
  onTrackingAttachment: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
  isPinned: PropTypes.bool,
};

CRPage.defaultProps = {
  victims: [],
  complainants: [],
  coaccused: [],
  location: {},
  isPinned: false,
};

export default Printable(CRPage);
