import React, { Component, PropTypes } from 'react';
import { rowDividerStyle, textStyle, nameStyle, personaInfoStyle, wrapperStyle } from './officer-info.style';


export default class OfficerInfo extends Component {
  render() {
    const { info, style } = this.props;
    const { fullName, birthYear, race, gender } = info;
    const currentYear = (new Date()).getFullYear();

    return (
      <div style={ { ...wrapperStyle, ...style } }>
        <div>
          <div style={ textStyle }>
            Officer
          </div>
          <div style={ nameStyle }>
            { fullName }
          </div>
        </div>
        <div style={ rowDividerStyle } />
        <div style={ personaInfoStyle }>
          { currentYear - birthYear } year old, { race }, { gender }.
        </div>
      </div>
    );
  }
}

OfficerInfo.propTypes = {
  info: PropTypes.shape({
    fullName: PropTypes.string,
    birthYear: PropTypes.number,
    race: PropTypes.string,
    gender: PropTypes.string,
  }),
  style: PropTypes.object,
};
