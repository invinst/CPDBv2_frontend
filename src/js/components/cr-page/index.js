import React, { Component, PropTypes } from 'react';
import { find } from 'lodash';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import FadeMotion from 'components/animation/fade-motion';
import Header from './header';
import StickyHeader from 'components/common/sticky-header';
import OfficerRow from './officer-row';
import MultiRow from './multi-row';
import FindingRow from './finding-row';
import Row from './row';
import Timeline from './timeline';
import Location from './location';
import Involvement from './involvement';
import Attachments from './attachments';
import {
  wrapperStyle, titleStyle, subtitleStyle, headerStyle, summarySectionStyle, overlayStyle, leftColumnStyle,
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
      crid, coaccused, complainants, officerId, openBottomSheetWithOfficer, openBottomSheetWithComplaint,
      incidentDate, point, address, location, beat, involvements, documents, videos, audios
    } = this.props;
    const { displayCoaccusedDropdown } = this.state;
    const officer = find(coaccused, officer => officer.id === officerId) || {};
    const {
      category, subcategory, fullName, race, gender, finalFinding, reccOutcome, finalOutcome, startDate, endDate
    } = officer;

    return (
      <div style={ wrapperStyle }>
        <div style={ headerWrapperStyle }>
          <StickyHeader style={ headerStyle }>
            <Header crid={ crid } coaccused={ coaccused } officerId={ officerId }
              displayCoaccusedDropdown={ displayCoaccusedDropdown }
              openBottomSheetWithComplaint={ openBottomSheetWithComplaint }
              onDropDownButtonClick={ this.handleToggleCoaccusedDropDown }/>
          </StickyHeader>
        </div>
        <ResponsiveFixedWidthComponent>
          <div style={ pageWrapperStyle }>
            <div style={ summarySectionStyle }>
              <div className='test--cr-category' style={ titleStyle }>{ category }</div>
              <div className='test--cr-subcategory' style={ subtitleStyle }>{ subcategory }</div>
              <OfficerRow
                fullName={ fullName } race={ race } gender={ gender } officerId={ officerId }
                openBottomSheetWithOfficer={ openBottomSheetWithOfficer }/>
              <MultiRow label='Complainant' contents={ complainants }/>
              <FindingRow label='Final Finding' content={ finalFinding }/>
              <Row label='Recommended Outcome' content={ reccOutcome }/>
              <Row label='Final Outcome' content={ finalOutcome }/>
            </div>
            <div style={ leftColumnStyle }>
              <Timeline startDate={ startDate } endDate={ endDate } incidentDate={ incidentDate }/>
              <Involvement involvements={ involvements } openBottomSheetWithOfficer={ openBottomSheetWithOfficer }/>
            </div>
            <div style={ rightColumnStyle }>
              <Location point={ point } address={ address } location={ location } beat={ beat }/>
              <Attachments title='DOCUMENTS' iconName='ic-document.svg' items={ documents }/>
              <Attachments title='VIDEO' iconName='ic-video.svg' items={ videos }/>
              <Attachments title='AUDIO' iconName='ic-audio.svg' items={ audios }/>
            </div>
          </div>
        </ResponsiveFixedWidthComponent>
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
  openBottomSheetWithOfficer: PropTypes.func,
  race: PropTypes.string,
  fullName: PropTypes.string,
  gender: PropTypes.string,
  officerId: PropTypes.number,
  point: PropTypes.object,
  address: PropTypes.string,
  location: PropTypes.string,
  beat: PropTypes.object,
  involvements: PropTypes.array,
  openBottomSheetWithComplaint: PropTypes.func,
  fetchCR: PropTypes.func,
  documents: PropTypes.array,
  videos: PropTypes.array,
  audios: PropTypes.array
};

CRPage.defaultProps = {
  fetchCR: () => {},
  coaccused: []
};
