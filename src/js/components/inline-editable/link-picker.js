import React, { PropTypes, Component } from 'react';

import {
  wrapperStyle, linkButtonStyle, popupWrapperStyle, linkInputStyle,
  hoveredLinkButtonStyle
} from './link-picker.style';
import HoverableButton from 'components/common/hoverable-button';


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
        <HoverableButton
          onClick={ this.handleTogglePopup }
          style={ {
            base: linkButtonStyle,
            hover: hoveredLinkButtonStyle
          } }>
          +
        </HoverableButton>
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
