import React, { Component, PropTypes } from 'react';
import { filter, map, find } from 'lodash';

import HoverableButton from 'components/common/hoverable-button';
import OfficerCard from './officer-card';
import OfficerAddBlockContainer from 'containers/bottom-sheet/report/officer-add-block';
import {
  addOfficerButtonStyle, addOfficerCircleWrapperStyle, addOfficerCircleStyle, officerInvolvedStyle,
  officerInvolvedTextStyle, officerCardsWrapperStyle, lastOfficerCardStyle
} from './officer-section.style';


export default class OfficerSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInput: false,
      officers: props.value
    };

    this.handleAddOfficerClick = this.handleAddOfficerClick.bind(this);
    this.handleNewOfficer = this.handleNewOfficer.bind(this);
    this.handleCancelOfficerAdd = this.handleCancelOfficerAdd.bind(this);
    this.handleRemoveOfficer = this.handleRemoveOfficer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ officers: nextProps.value });
  }

  handleAddOfficerClick(event) {
    this.setState({ showInput: true });
  }

  handleCancelOfficerAdd() {
    this.setState({ showInput: false });
  }

  handleNewOfficer(officer) {
    const { onChange } = this.props;
    const { officers } = this.state;

    if (!find(officers, obj => obj.id === officer.id)) {
      officers.push(officer);
    }

    this.setState({ officers: officers, showInput: false });
    onChange(officers);
  }

  handleRemoveOfficer(officerId) {
    const { onChange } = this.props;
    const { officers } = this.state;

    const newOfficers = filter(officers, officer => officer.id !== officerId);

    this.setState({
      officers: newOfficers
    });

    onChange(newOfficers);
  }

  renderAddOfficerButton() {
    return (
      <div className='test--add-officer-button'
        style={ addOfficerButtonStyle } onClick={ this.handleAddOfficerClick }>Add Officer</div>
    );
  }

  renderOfficerInvolved() {
    const { officers } = this.state;
    const { editModeOn } = this.props;

    return (
      <div className='test--officer-involved' style={ officerInvolvedStyle }>
        <div style={ officerInvolvedTextStyle }>Officers Involved ({ officers.length })</div>
        {
          editModeOn ?
            <div style={ addOfficerCircleWrapperStyle }>
              <HoverableButton className='test--circle-add-officer-button'
                style={ addOfficerCircleStyle } onClick={ this.handleAddOfficerClick }/>
            </div>
            : null
        }
      </div>
    );
  }

  renderOfficerInput() {
    return (
      <OfficerAddBlockContainer onChange={ this.handleNewOfficer } onCancelClick={ this.handleCancelOfficerAdd }/>
    );
  }

  renderOfficerCards() {
    const { officers } = this.state;
    const { editModeOn, openOfficerPage } = this.props;

    const officerCards = map(officers, (officer, index) => {
      const isLastCard = index === officers.length - 1;
      return (
        <OfficerCard
          key={ officer.id } editModeOn={ editModeOn } officerId={ officer.id } fullName={ officer.fullName }
          race={ officer.race } gender={ officer.gender } allegationCount={ officer.allegationCount }
          onRemoveClick={ this.handleRemoveOfficer } style={ isLastCard ? lastOfficerCardStyle : null }
          openOfficerPage={ openOfficerPage }/>
      );
    });

    return (
      <div style={ officerCardsWrapperStyle }>{ officerCards }</div>
    );
  }

  render() {
    const { showInput, officers } = this.state;
    const { editModeOn } = this.props;

    let header;
    if (!editModeOn) {
      header = this.renderOfficerInvolved();
    } else {
      if (showInput) {
        header = this.renderOfficerInput();
      } else if (officers && officers.length) {
        header = this.renderOfficerInvolved();
      } else {
        header = this.renderAddOfficerButton();
      }
    }

    return (
      <div>
        { header }
        {
          this.renderOfficerCards()
        }
      </div>
    );
  }
}

OfficerSection.propTypes = {
  value: PropTypes.array,
  openOfficerPage: PropTypes.func,
  onChange: PropTypes.func,
  editModeOn: PropTypes.bool
};

OfficerSection.defaultProps = {
  value: []
};
