import React, { Component, PropTypes } from 'react';

import { rowDividerStyle, textStyle, nameStyle, personaInfoStyle, wrapperStyle } from './officer-info.style';


class OfficerInfo extends Component {
  render() {
    const { info, style, hovering } = this.props;
    const { fullName, age, race, gender } = info;

    return (
      <div style={ { ...wrapperStyle, ...style } } onClick={ this.handleClick } className='test--officer-info'>
        <div style={ textStyle }>
          Officer
        </div>
        <div style={ nameStyle(hovering) } className='test--officer-name'>
          { fullName }
        </div>
        <div style={ rowDividerStyle } />
        <div style={ personaInfoStyle } className='test--officer-personal-info'>
          { age }-year-old { race } { gender }
        </div>
      </div>
    );
  }
}

OfficerInfo.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    fullName: PropTypes.string,
    birthYear: PropTypes.number,
    age: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    gender: PropTypes.string,
  }),
  style: PropTypes.object,
  hovering: PropTypes.bool
};

export default OfficerInfo;
