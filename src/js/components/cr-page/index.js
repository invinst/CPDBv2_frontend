import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { get, isEmpty } from 'lodash';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
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
import {
wrapperStyle,
CRIDHeaderStyle,
leftColumnStyle,
footerStyle,
rightColumnStyle,
summarySectionWrapperStyle,
summaryTextStyle,
} from './cr-page.style';
import { POPUP_NAMES } from 'utils/constants';


export default class CRPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      crid, coaccused, complainants, alreadyRequested, category, subcategory,
      incidentDate, point, address, crLocation, beat, involvements, attachments,
      openRequestDocumentModal, summary, victims, startDate, endDate, popup, pathname
    } = this.props;

    return (
      <DocumentTitle title={ `CR ${crid}` }>
        <div style={ wrapperStyle }>
          <ShareableHeaderContainer/>
          <ResponsiveFluidWidthComponent>
            <h1 className='test--cr-title' style={ CRIDHeaderStyle }>CR { crid }</h1>
          </ResponsiveFluidWidthComponent>
          <ComplaintCategory
            category={ category }
            subcategory={ subcategory }
          />
          <ComplaintIncidentDate incidentDate={ incidentDate }/>
          <AccusedOfficers officers={ coaccused } popup={ get(popup, POPUP_NAMES.COMPLAINT.ACCUSED_OFFICER) }/>
          <ResponsiveFluidWidthComponent>
            <div style={ summarySectionWrapperStyle }>
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
                      <div className='test--summary' style={ summaryTextStyle }>{ summary }</div>
                    </SummaryRow>
                  ) : null
              }
              <Attachments
                items={ attachments }
                openRequestDocumentModal={ openRequestDocumentModal }
                alreadyRequested={ alreadyRequested }
                pathname={ pathname }
              />
              <div style={ leftColumnStyle }>
                <Timeline startDate={ startDate } endDate={ endDate } incidentDate={ incidentDate }/>
                <Involvement involvements={ involvements } popup={ popup }/>
              </div>
              <div style={ rightColumnStyle }>
                <Location point={ point } address={ address } location={ crLocation } beat={ beat }/>
              </div>
            </div>
          </ResponsiveFluidWidthComponent>
          { !isEmpty(address) ? <RelatedComplaints crid={ crid } /> : null }
          <FooterContainer style={ footerStyle }/>
        </div>
      </DocumentTitle>
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
};

CRPage.defaultProps = {
  victims: [],
  complainants: [],
  coaccused: []
};
