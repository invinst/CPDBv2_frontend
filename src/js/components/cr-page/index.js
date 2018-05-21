import React, { Component, PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import SummaryRow from './summary-row';
import Demographics from './demographics';
import Timeline from './timeline';
import Location from './location';
import Involvement from './involvement';
import Attachments from './attachments';
import AccusedOfficers from './accused-officers';
import RelatedComplaints from './related-complaints';
import {
  wrapperStyle, CRIDHeaderStyle, leftColumnStyle,
  rightColumnStyle, summarySectionWrapperStyle, summaryTextStyle
} from './cr-page.style';


export default class CRPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      crid, coaccused, complainants, alreadyRequested,
      incidentDate, point, address, crLocation, beat, involvements, attachments,
      openRequestDocumentModal, summary, victims, startDate, endDate
    } = this.props;

    return (
      <div style={ wrapperStyle }>
        <ShareableHeaderContainer/>
        <ResponsiveFluidWidthComponent>
          <h1 className='test--cr-title' style={ CRIDHeaderStyle }>CR { crid }</h1>
        </ResponsiveFluidWidthComponent>
        <AccusedOfficers officers={ coaccused } />
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
            />
            <div style={ leftColumnStyle }>
              <Timeline startDate={ startDate } endDate={ endDate } incidentDate={ incidentDate }/>
              <Involvement involvements={ involvements }/>
            </div>
            <div style={ rightColumnStyle }>
              <Location point={ point } address={ address } location={ crLocation } beat={ beat }/>
            </div>
          </div>
        </ResponsiveFluidWidthComponent>
        <RelatedComplaints crid={ crid } />
      </div>
    );
  }
}

CRPage.propTypes = {
  crid: PropTypes.string,
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
};

CRPage.defaultProps = {
  victims: [],
  complainants: [],
  coaccused: []
};
