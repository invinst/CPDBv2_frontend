import React, { Component, PropTypes } from 'react';
import { isEmpty, cloneDeep, pullAt } from 'lodash';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import SummaryRow from './summary-row';
import Demographics from './demographics';
import Timeline from './timeline';
import Location from './location';
import Involvement from './involvement';
import Attachments from './attachments';
import AccusedOfficers from './accused-officers';
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

    const newBreadcrumb = this.refineBreadcrumb(nextProps.breadcrumb);
    if (newBreadcrumb !== nextProps.breadcrumb) {
      this.props.resetBreadcrumbs(newBreadcrumb);
    }
  }

  refineBreadcrumb(breadcrumb) {
    const breadcrumbs = breadcrumb.breadcrumbs;
    if (!isEmpty(breadcrumbs)) {
      const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
      const secondLastBreadcrumb = breadcrumbs[breadcrumbs.length - 2];

      if (lastBreadcrumb.breadcrumbKey === secondLastBreadcrumb.breadcrumbKey) {
        if (lastBreadcrumb.params.crid === secondLastBreadcrumb.params.crid) {
          if (lastBreadcrumb.params.officerId !== secondLastBreadcrumb.params.officerId) {
            const newBreadcrumb = cloneDeep(breadcrumb);
            pullAt(newBreadcrumb.breadcrumbs, newBreadcrumb.breadcrumbs.length - 2);
            return newBreadcrumb;
          }
        }
      }
    }
    return breadcrumb;
  }

  render() {
    const {
      crid, coaccused, complainants, openOfficerPage, alreadyRequested,
      incidentDate, point, address, crLocation, beat, involvements, attachments,
      openRequestDocumentModal, summary, victims, startDate, endDate
    } = this.props;

    return (
      <div style={ wrapperStyle } className='test--cr-page'>
        <ResponsiveFluidWidthComponent>
          <div style={ upperSectionWrapperStyle }>
            <h1 style={ CRIDHeaderStyle }>CR { crid }</h1>
            <AccusedOfficers officers={ coaccused } />
          </div>
        </ResponsiveFluidWidthComponent>
        <ResponsiveFluidWidthComponent>
          <div style={ summarySectionWrapperStyle }>
            <SummaryRow label='VICTIM'>
              <Demographics persons={ victims } />
            </SummaryRow>
            <SummaryRow label='COMPLAINANT'>
              <Demographics persons={ complainants } />
            </SummaryRow>
            <SummaryRow label='SUMMARY'>
              <div style={ summaryTextStyle }>{ summary }</div>
            </SummaryRow>
            <Attachments
              items={ attachments }
              openRequestDocumentModal={ openRequestDocumentModal }
              alreadyRequested={ alreadyRequested }
            />
            <div style={ leftColumnStyle }>
              <Timeline startDate={ startDate } endDate={ endDate } incidentDate={ incidentDate }/>
              <Involvement involvements={ involvements } openOfficerPage={ openOfficerPage }/>
            </div>
            <div style={ rightColumnStyle }>
              <Location point={ point } address={ address } location={ crLocation } beat={ beat }/>
            </div>
          </div>
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

CRPage.propTypes = {
  crid: PropTypes.string,
  coaccused: PropTypes.array,
  category: PropTypes.string,
  subcategory: PropTypes.string,
  complainants: PropTypes.array,
  victims: PropTypes.array,
  finalFinding: PropTypes.string,
  finalOutcome: PropTypes.string,
  recOutcome: PropTypes.string,
  incidentDate: PropTypes.string,
  openOfficerPage: PropTypes.func,
  race: PropTypes.string,
  fullName: PropTypes.string,
  gender: PropTypes.string,
  summary: PropTypes.string,
  officerId: PropTypes.number,
  point: PropTypes.object,
  address: PropTypes.string,
  crLocation: PropTypes.string,
  beat: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  involvements: PropTypes.array,
  fetchCR: PropTypes.func,
  attachments: PropTypes.array,
  openRequestDocumentModal: PropTypes.func,
  alreadyRequested: PropTypes.bool,
  resetBreadcrumbs: PropTypes.func,
  breadcrumb: PropTypes.object,
};

CRPage.defaultProps = {
  fetchCR: () => {},
  coaccused: [],
  breadcrumb: {
    breadcrumbs: []
  }
};
