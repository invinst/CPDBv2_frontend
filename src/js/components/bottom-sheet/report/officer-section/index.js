import React, { Component, PropTypes } from 'react';
import { filter } from 'lodash';

import HoverableButton from 'components/common/hoverable-button';
import OfficerCard from './officer-card';
import OfficerAddBlock from './officer-add-block';
import {
  addOfficerButtonStyle, addOfficerCircleWrapperStyle, addOfficerCircleStyle, officerInvolvedStyle,
  officerInvolvedTextStyle, officerCardsWrapperStyle, lastOfficerCardStyle
} from './officer-section.style';


export default class OfficerSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInput: false,
      officers: props.officers
    };

    this.handleAddOfficerClick = this.handleAddOfficerClick.bind(this);
    this.handleNewOfficer = this.handleNewOfficer.bind(this);
    this.handleCancelOfficerAdd = this.handleCancelOfficerAdd.bind(this);
    this.handleRemoveOfficer = this.handleRemoveOfficer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ officers: nextProps.officers });
  }

  handleAddOfficerClick(event) {
    this.setState({ showInput: true });
  }

  handleCancelOfficerAdd() {
    this.setState({ showInput: false });
  }

  handleNewOfficer(officer) {
    const { officers } = this.state;
    if (!find(officers, obj => obj.id === officer.id)) {
      officers.push(officer);
    }
    this.setState({ officers: officers, showInput: false });
  }

  handleRemoveOfficer(officerId) {
    const { officers } = this.state;

    this.setState({
      officers: filter(officers, officer => officer.id !== officerId)
    });
  }

  renderAddOfficerButton() {
    return (<div style={ addOfficerButtonStyle } onClick={ this.handleAddOfficerClick }>Add Officer</div>);
  }

  renderOfficerInvolved() {
    const { officers } = this.state;

    return (
      <div style={ officerInvolvedStyle }>
        <div style={ officerInvolvedTextStyle }>Officers Involved ({ officers.length })</div>
        <div style={ addOfficerCircleWrapperStyle }>
          <HoverableButton style={ addOfficerCircleStyle } onClick={ this.handleAddOfficerClick }/>
        </div>
      </div>
    );
  }

  renderOfficerInput() {
    const { searchOfficers, officerSearchResult } = this.props;

    return (
      <OfficerAddBlock
        searchOfficers={ searchOfficers } officers={ officerSearchResult } onChange={ this.handleNewOfficer }
        onCancelClick={ this.handleCancelOfficerAdd }/>
    );
  }

  renderOfficerCards() {
    const { officers } = this.state;

    const officerCards = officers.map((officer, index) => {
      const isLastCard = index === officers.length - 1;
      return (
        <OfficerCard
          key={ officer.id } officerId={ officer.id } fullName={ officer.fullName } race={ officer.race }
          gender={ officer.gender } allegationCount={ officer.allegationCount }
          onRemoveClick={ this.handleRemoveOfficer } style={ isLastCard ? lastOfficerCardStyle : null }/>
      );
    });

    return (
      <div style={ officerCardsWrapperStyle }>{ officerCards }</div>
    );
  }

  render() {
    const { showInput, officers } = this.state;

    let header;
    if (showInput) {
      header = this.renderOfficerInput();
    } else if (officers.length) {
      header = this.renderOfficerInvolved();
    } else {
      header = this.renderAddOfficerButton();
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
  officerSearchResult: PropTypes.array,
  officers: PropTypes.array,
  searchOfficers: PropTypes.func,
  sectionEditModeOn: PropTypes.bool
};

OfficerSection.defaultProps = {
  officers: [],
  officerSearchResult: []
};
