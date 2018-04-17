import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';


import {
  coaccusalCardStyle, footerStyle, officerInfoStyle,
  headerStyle, thumbnailStyle, officerNameStyle, headerTitleStyle,
  allegationStyle, allegationCountStyle, sustainedCountStyle,
} from './coaccusal-card.style';


export default class CoaccusalCard extends Component {
  render() {
    const {
      officerName, allegationCount, sustainedCount, allegationPercentile,
      age, race, gender, coaccusalCount, thumbnail, extraStyle
    } = this.props;

    return (
      <div style={ { ...coaccusalCardStyle, ...extraStyle } }>
        <div style={ headerStyle } >
          <img style={ thumbnailStyle } src={ thumbnail }/>
          <div style={ headerTitleStyle }>
            <div>Officer</div>
            <div style={ officerNameStyle }>{ officerName }</div>
          </div>
        </div>
        <div style={ allegationStyle }>
          <div>
            <span style={ allegationCountStyle }>{ pluralize('allegation', allegationCount, true) } </span>
            <span style={ sustainedCountStyle }>{ pluralize('sustained', sustainedCount, true) }</span>
          </div>
          More than { allegationPercentile } of other officers
        </div>
        <div style={ officerInfoStyle }>
          { age } years old, { race }, { gender }.
        </div>
        <div style={ footerStyle }>
          Coaccused in { pluralize('case', coaccusalCount, true) }.
        </div>
      </div>
    );
  }
}

CoaccusalCard.propTypes = {
  officerName: PropTypes.string,
  allegationCount: PropTypes.number,
  sustainedCount: PropTypes.number,
  allegationPercentile: PropTypes.number,
  age: PropTypes.number,
  race: PropTypes.string,
  gender: PropTypes.string,
  coaccusalCount: PropTypes.number,
  thumbnail: PropTypes.string,
  extraStyle: PropTypes.object,
};

CoaccusalCard.defaultProps = {

};
