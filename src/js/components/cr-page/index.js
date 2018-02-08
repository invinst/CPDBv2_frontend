import React, { Component, PropTypes } from 'react';
import { find, isEmpty, cloneDeep, pullAt } from 'lodash';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import FadeMotion from 'components/animation/fade-motion';
import Header from './header';
import OfficerRow from './officer-row';
import MultiRow from './multi-row';
import FindingRow from './finding-row';
import Row from 'components/common/row';
import Timeline from './timeline';
import Location from './location';
import Involvement from './involvement';
import Attachments from './attachments';
import BlockTitle from 'components/common/block-title';
import {
  wrapperStyle, titleStyle, subtitleStyle, summarySectionStyle, overlayStyle, leftColumnStyle,
  pageWrapperStyle, rightColumnStyle, headerWrapperStyle
} from './cr-page.style';


export default class CRPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCoaccusedDropdown: false
    };

    this.handleToggleCoaccusedDropDown = this.handleToggleCoaccusedDropDown.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
  }

  componentDidMount() {
    const { crid, fetchCR } = this.props;

    fetchCR(crid);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.officerId !== nextProps.officerId) {
      this.setState({ displayCoaccusedDropdown: false });
    }

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

  handleToggleCoaccusedDropDown() {
    this.setState({
      displayCoaccusedDropdown: !this.state.displayCoaccusedDropdown
    });
  }

  renderOverlay(opacity) {
    return (
      <div className='test--cr-overlay'
        style={ { ...overlayStyle, opacity: opacity } } onClick={ this.handleToggleCoaccusedDropDown }/>
    );
  }

  render() {
    const {
      crid, coaccused, complainants, officerId, openOfficerPage, openComplaintPage, alreadyRequested,
      incidentDate, point, address, crLocation, beat, involvements, documents, videos, audios, openRequestDocumentModal,
      scrollPosition
    } = this.props;
    const { displayCoaccusedDropdown } = this.state;
    const officer = find(coaccused, officer => officer.id === officerId) || {};
    const {
      category, subcategory, fullName, finalFinding, reccOutcome, finalOutcome, startDate, endDate, badge
    } = officer;

    const showRequestMessage = (
      (!videos || videos.length === 0) &&
      (!audios || audios.length === 0) &&
      (!documents || documents.length === 0)
    );

    const officerRow = isEmpty(officer) ? null : (
      <OfficerRow
        fullName={ fullName } badge={ badge } officerId={ officerId }
        openOfficerPage={ openOfficerPage }/>
    );
    return (
      <div style={ wrapperStyle } className='test--cr-page'>
        <div style={ headerWrapperStyle }>
          <Header crid={ crid } coaccused={ coaccused } officerId={ officerId } scrollPosition={ scrollPosition }
            displayCoaccusedDropdown={ displayCoaccusedDropdown }
            openComplaintPage={ openComplaintPage }
            onDropDownButtonClick={ this.handleToggleCoaccusedDropDown }/>
        </div>
        <ResponsiveFluidWidthComponent>
          <div style={ pageWrapperStyle }>
            <div style={ summarySectionStyle }>
              <div className='test--cr-category' style={ titleStyle }>{ category }</div>
              <div className='test--cr-subcategory' style={ subtitleStyle }>{ subcategory }</div>
              { officerRow }
              <MultiRow label='COMPLAINANT' contents={ complainants }/>
            </div>
            <div style={ leftColumnStyle }>
              <BlockTitle>OUTCOME</BlockTitle>
              <FindingRow label='Final Finding' content={ finalFinding }/>
              <Row label='Recommended Outcome' content={ reccOutcome }/>
              <Row label='Final Outcome' content={ finalOutcome } hasBorderBottom={ false } />

              <Timeline startDate={ startDate } endDate={ endDate } incidentDate={ incidentDate }/>
              <Involvement involvements={ involvements } openOfficerPage={ openOfficerPage }/>
            </div>
            <div style={ rightColumnStyle }>
              <Location point={ point } address={ address } location={ crLocation } beat={ beat }/>
              <Attachments
                title='DOCUMENTS'
                iconName='ic-document.svg'
                items={ documents }
                openRequestDocumentModal={ openRequestDocumentModal }
                showRequestMessage={ showRequestMessage }
                alreadyRequested={ alreadyRequested }
              />

              <Attachments
                title='VIDEO'
                iconName='ic-video.svg'
                items={ videos }
                openRequestDocumentModal={ openRequestDocumentModal }
              />
              <Attachments
                title='AUDIO'
                iconName='ic-audio.svg'
                items={ audios }
                openRequestDocumentModal={ openRequestDocumentModal }
              />

            </div>
          </div>
        </ResponsiveFluidWidthComponent>
        <FadeMotion show={ displayCoaccusedDropdown } maxOpacity={ .5 }>
          { this.renderOverlay }
        </FadeMotion>
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
  finalFinding: PropTypes.string,
  finalOutcome: PropTypes.string,
  recOutcome: PropTypes.string,
  incidentDate: PropTypes.string,
  openOfficerPage: PropTypes.func,
  race: PropTypes.string,
  fullName: PropTypes.string,
  gender: PropTypes.string,
  officerId: PropTypes.number,
  point: PropTypes.object,
  address: PropTypes.string,
  crLocation: PropTypes.string,
  beat: PropTypes.object,
  involvements: PropTypes.array,
  openComplaintPage: PropTypes.func,
  fetchCR: PropTypes.func,
  documents: PropTypes.array,
  videos: PropTypes.array,
  audios: PropTypes.array,
  openRequestDocumentModal: PropTypes.func,
  alreadyRequested: PropTypes.bool,
  scrollPosition: PropTypes.string,
  resetBreadcrumbs: PropTypes.func,
  breadcrumb: PropTypes.object,
};

CRPage.defaultProps = {
  fetchCR: () => {},
  coaccused: [],
  scrollPosition: 'top',
  breadcrumb: {
    breadcrumbs: []
  }
};
