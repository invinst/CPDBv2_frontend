import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';

import Hoverable from 'components/common/higher-order/hoverable';
import roundPercentile from 'utils/round-percentile';
import {
  allegationCountStyle,
  allegationStyle,
  coaccusalCardStyle,
  footerStyle,
  headerStyle,
  headerTitleStyle,
  officerInfoStyle,
  officerNameStyle,
  sustainedCountStyle,
  thumbnailStyle,
} from './coaccusal-card.style';


class CoaccusalCard extends Component {
  render() {
    const {
      officerName, allegationCount, sustainedCount, allegationPercentile, age, race, gender, coaccusalCount, thumbnail,
      extraStyle, hovering, openOfficerPage, officerId, rank,
    } = this.props;

    return (
      <div
        style={ { ...coaccusalCardStyle(hovering), ...extraStyle } }
        onClick={ () => openOfficerPage(officerId) }
        className='test--coaccusal-card'
      >
        <div style={ headerStyle } >
          <img style={ thumbnailStyle } src={ thumbnail } className='test--coaccusal-card-thumbnail'/>
          <div style={ headerTitleStyle }>
            <div className='test--coaccusal-card-officer-rank'>{ rank }</div>
            <div
              style={ officerNameStyle(hovering) }
              className='test--coaccusal-card-officer-name'>
              { officerName }
            </div>
          </div>
        </div>
        <div style={ allegationStyle }>
          <div>
            <span style={ allegationCountStyle } className='test--coaccusal-card-allegation-count'>
              { pluralize('allegation', allegationCount, true) }
            </span>
            <span>&nbsp;</span>
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
  age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  race: PropTypes.string,
  gender: PropTypes.string,
  coaccusalCount: PropTypes.number,
  thumbnail: PropTypes.string,
  extraStyle: PropTypes.object,
  hovering: PropTypes.bool,
  openOfficerPage: PropTypes.func,
  officerId: PropTypes.number,
  rank: PropTypes.string,
};

export default Hoverable(CoaccusalCard);
