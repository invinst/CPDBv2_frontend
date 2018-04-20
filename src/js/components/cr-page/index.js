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
  rightColumnStyle, upperSectionWrapperStyle, summarySectionWrapperStyle, summaryTextStyle
} from './cr-page.style';


export default class CRPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { crid, fetchCR } = this.props;

    fetchCR(crid);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchCR, crid } = nextProps;
    if (this.props.crid !== crid) {
      fetchCR(crid);
    }
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
          <div style={ upperSectionWrapperStyle }>
            <h1 className='test--cr-title' style={ CRIDHeaderStyle }>CR { crid }</h1>
            <AccusedOfficers officers={ coaccused } />
          </div>
        </ResponsiveFluidWidthComponent>
        <ResponsiveFluidWidthComponent>
          <div style={ summarySectionWrapperStyle }>
            <SummaryRow label='VICTIM' className='test--victims'>
              <Demographics persons={ victims } />
            </SummaryRow>
            <SummaryRow label='COMPLAINANT' className='test--complainant'>
              <Demographics persons={ complainants } />
            </SummaryRow>
            <SummaryRow label='SUMMARY'>
              <div className='test--summary' style={ summaryTextStyle }>{ summary }</div>
            </SummaryRow>
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
          <RelatedComplaints crid={ crid } />
        </ResponsiveFluidWidthComponent>
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
  fetchCR: PropTypes.func,
  attachments: PropTypes.array,
  openRequestDocumentModal: PropTypes.func,
  alreadyRequested: PropTypes.bool,
};

CRPage.defaultProps = {
  fetchCR: () => {},
  coaccused: []
};
