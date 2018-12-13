import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
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
import { POPUP_NAMES } from 'utils/constants';
import styles from './cr-page.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';
import Printable from 'components/common/higher-order/printable';
import PrintNotes from 'components/common/print-notes';
import PrintPreloadFonts from 'components/common/print-preload-fonts';


class CRPage extends Component {
  render() {
    const {
      crid, coaccused, complainants, alreadyRequested, category, subcategory,
      incidentDate, point, address, crLocation, beat, involvements, attachments,
      openRequestDocumentModal, summary, victims, startDate, endDate, popup, pathname, notes
    } = this.props;

    const { printMode } = this.context;

    const involvementItem = <Involvement involvements={ involvements } popup={ popup } pathName={ pathname }/>;

    return (
      <DocumentMeta title={ `CR ${crid}` }>
        <div className={ styles.crPage }>
          <ShareableHeaderContainer/>
          <div className={ cx(responsiveContainerStyles.responsiveContainer, 'top-content') }>
            <h1 className='cr-title'>CR { crid }</h1>
            <ComplaintCategory
              category={ category }
              subcategory={ subcategory }
            />
            <ComplaintIncidentDate incidentDate={ incidentDate }/>
            <AccusedOfficers
              officers={ coaccused }
              popup={ get(popup, POPUP_NAMES.COMPLAINT.ACCUSED_OFFICER) }
              pathName={ pathname }
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
                alreadyRequested={ alreadyRequested }
                pathname={ pathname }
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
      </DocumentMeta>
    );
  }
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
  pathname: PropTypes.string,
  notes: PropTypes.array,
};

CRPage.defaultProps = {
  victims: [],
  complainants: [],
  coaccused: []
};

CRPage.contextTypes = {
  printMode: PropTypes.bool,
};

export default Printable(CRPage);
