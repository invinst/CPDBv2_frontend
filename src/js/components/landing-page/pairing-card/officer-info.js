import React, { Component, PropTypes } from 'react';
import { rowDividerStyle, textStyle, nameStyle, personaInfoStyle, wrapperStyle } from './officer-info.style';


export default class OfficerInfo extends Component {
  render() {
    const { info, style } = this.props;
    const { name, age, race, gender } = info;

    return (
      <div style={ { ...wrapperStyle, ...style } }>
        <div>
          <div style={ textStyle }>
            Officer
          </div>
          <div style={ nameStyle }>
            { name }
          </div>
        </div>
        <div style={ rowDividerStyle } />
        <div style={ personaInfoStyle }>
          { age } year old, { race }, { gender }.
        </div>
      </div>
    );
  }
}

OfficerInfo.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
    race: PropTypes.string,
    gender: PropTypes.string,
  }),
  style: PropTypes.object,
};
