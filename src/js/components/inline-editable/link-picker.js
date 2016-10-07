import React, { PropTypes, Component } from 'react';

import {
  wrapperStyle, linkButtonStyle, popupWrapperStyle, linkInputStyle
} from './link-picker.style';


export default class LinkPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleTogglePopup = this.handleTogglePopup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleTogglePopup() {
    this.setState({
      open: !this.state.open
    });
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    const { editModeOn, style } = this.props;
    const value = this.props.value || '';
    const { open } = this.state;

    if (!editModeOn) return null;

    return (
      <div style={ wrapperStyle }>
        <div style={ linkButtonStyle } onClick={ this.handleTogglePopup }>
          +
        </div>
        {
          open ?
            <div style={ { ...popupWrapperStyle, ...style } }>
              <input style={ linkInputStyle } onChange={ this.handleChange } value={ value }/>
            </div> :
            null
        }
      </div>
    );
  }
}

LinkPicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  editModeOn: PropTypes.bool,
  style: PropTypes.object
};
