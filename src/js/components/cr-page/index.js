import React, { Component, PropTypes } from 'react';
import { find } from 'lodash';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import Header from './header';
import StickyHeader from 'components/common/sticky-header';
import OfficerRow from './officer-row';
import MultiRow from './multi-row';
import OutcomeRow from './outcome-row';
import Row from './row';
import { wrapperStyle, titleStyle, subtitleStyle, headerStyle, pageWrapperStyle, overlayStyle } from './cr-page.style';


export default class CRPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCoaccusedDropdown: false
    };

    this.handleToggleCoaccusedDropDown = this.handleToggleCoaccusedDropDown.bind(this);
  }

  componentWillMount() {
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

  render() {
    const {
      crid, coaccused, complainants, officerId, openBottomSheetWithOfficer, openBottomSheetWithComplaint
    } = this.props;
    const { displayCoaccusedDropdown } = this.state;
    const officer = find(coaccused, officer => officer.id === officerId) || {};
    const { category, subcategory, fullName, race, gender, finalFinding, reccOutcome, finalOutcome } = officer;

    return (
      <div style={ wrapperStyle }>
        <StickyHeader style={ headerStyle }>
          <Header crid={ crid } coaccused={ coaccused } officerId={ officerId }
            displayCoaccusedDropdown={ displayCoaccusedDropdown }
            openBottomSheetWithComplaint={ openBottomSheetWithComplaint }
            onDropDownButtonClick={ this.handleToggleCoaccusedDropDown }/>
        </StickyHeader>
        <ResponsiveFixedWidthComponent>
          <div style={ pageWrapperStyle }>
            <div style={ titleStyle }>{ category }</div>
            <div style={ subtitleStyle }>{ subcategory }</div>
            <OfficerRow
              fullName={ fullName } race={ race } gender={ gender } officerId={ officerId }
              openBottomSheetWithOfficer={ openBottomSheetWithOfficer }/>
            <MultiRow label='Complainant' contents={ complainants }/>
            <OutcomeRow label='Final Finding' content={ finalFinding }/>
            <Row label='Recommended Outcome' content={ reccOutcome }/>
            <Row label='Final Outcome' content={ finalOutcome }/>
          </div>
        </ResponsiveFixedWidthComponent>
        {
          displayCoaccusedDropdown
            ? <div style={ overlayStyle } onClick={ this.handleToggleCoaccusedDropDown }/>
            : null
        }
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
  openBottomSheetWithOfficer: PropTypes.func,
  race: PropTypes.string,
  fullName: PropTypes.string,
  gender: PropTypes.string,
  officerId: PropTypes.number,
  openBottomSheetWithComplaint: PropTypes.func,
  fetchCR: PropTypes.func
};
