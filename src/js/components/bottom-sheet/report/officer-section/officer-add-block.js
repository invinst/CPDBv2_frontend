import React, { Component, PropTypes } from 'react';

import OfficerAutoSuggest from './officer-auto-suggest';
import {
  wrapperStyle, officerTextStyle, buttonStyle, disabledButtonStyle, headerStyle
} from './officer-add-block.style';


export default class OfficerAddBlock extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.state = { selectedOfficer: null };
  }

  handleChange(officer) {
    this.setState({ selectedOfficer: officer });
  }

  handleAddClick() {
    this.props.onChange(this.state.selectedOfficer);
  }

  render() {
    const { onCancelClick, officers, searchOfficers } = this.props;
    const { selectedOfficer } = this.state;
    return (
      <div style={ wrapperStyle }>
        <div style={ headerStyle }>
          <div style={ officerTextStyle }>Officer</div>
          <div className='test--add-button'
            style={ selectedOfficer ? buttonStyle : disabledButtonStyle }
            onClick={ this.handleAddClick }>Add</div>
          <div className='test--cancel-button' style={ buttonStyle } onClick={ onCancelClick }>Cancel</div>
        </div>
        <OfficerAutoSuggest officers={ officers } searchOfficers={ searchOfficers } onChange={ this.handleChange }/>
      </div>
    );
  }
}

OfficerAddBlock.propTypes = {
  onCancelClick: PropTypes.func,
  officers: PropTypes.array,
  searchOfficers: PropTypes.func,
  onChange: PropTypes.func
};
