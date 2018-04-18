import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';

import roundPercentile from 'utils/round-percentile';
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
      <div style={ { ...coaccusalCardStyle, ...extraStyle } } className='test--coaccusal-card'>
        <div style={ headerStyle } >
          <img style={ thumbnailStyle } src={ thumbnail } className='test--coaccusal-card-thumbnail'/>
          <div style={ headerTitleStyle }>
            <div>Officer</div>
            <div style={ officerNameStyle } className='test--coaccusal-card-officer-name'>{ officerName }</div>
          </div>
        </div>
        <div style={ allegationStyle }>
          <div>
            <span style={ allegationCountStyle } className='test--coaccusal-card-allegation-count'>
              { pluralize('allegation', allegationCount, true) }
            </span>
            <span style={ sustainedCountStyle(sustainedCount) } className='test--coaccusal-card-sustained-count'>
              { sustainedCount } sustained
            </span>
          </div>
          <span className='test--coaccusal-card-allegation-percentile'>
            More than { roundPercentile(allegationPercentile) }% of other officers
          </span>
        </div>
        <div style={ officerInfoStyle } className='test--coaccusal-card-officer-info'>
          { age } years old, { race }, { gender }.
        </div>
        <div style={ footerStyle } className='test--coaccusal-card-coaccusal-count'>
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
