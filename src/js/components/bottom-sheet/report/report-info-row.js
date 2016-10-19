import React, { Component, PropTypes } from 'react';

import { infoRowStyle, labelStyle, inputStyle, inputEditStyle } from './report.style';


class ReportInfoRow extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onChange(this.input.value);
  }

  render() {
    const { label, value, editModeOn } = this.props;
    const style = editModeOn ? inputEditStyle : inputStyle;

    return (
      <div style={ infoRowStyle }>
        <span style={ labelStyle }>{ label }</span>
        <input
          ref={ (el) => this.input = el }
          style={ style }
          value={ value }
          onChange={ this.handleChange }
          disabled={ !editModeOn }/>
      </div>
    );
  }
}

ReportInfoRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  editModeOn: PropTypes.bool
};

export default ReportInfoRow;
