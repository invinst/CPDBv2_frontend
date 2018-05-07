import React, { PropTypes, Component } from 'react';
import { entries } from 'lodash';

import {
  wrapperStyle, displayOptionStyle, optionItemStyle, arrowStyle, optionsStyle, displayValueStyle
} from './dropdown.style';


export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  handleToggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleOptionSelect(value) {
    this.props.onChange(value);
    this.setState({
      expanded: false
    });
  }

  render() {
    const { options, value } = this.props;
    const { expanded } = this.state;

    return (
      <div style={ wrapperStyle }>
        <div
          className='test--related-complaint-dropdown'
          style={ displayOptionStyle }
          onClick={ this.handleToggle.bind(this) }>
          <span style={ displayValueStyle }>{ options[value] }</span>
          <span style={ arrowStyle(expanded) } />
        </div>
        <div style={ optionsStyle(expanded) }>
          {
            entries(options).map((option, index) => (
              value !== option[0] ? (
                <div
                  key={ index }
                  className='test--related-complaint-dropdown-item'
                  style={ optionItemStyle }
                  onClick={ this.handleOptionSelect.bind(this, option[0]) }>
                  { option[1] }
                </div>
              )
              : null
            ))
          }
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func
};

Dropdown.defaultProps = {
  options: {},
  onChange: () => {}
};
