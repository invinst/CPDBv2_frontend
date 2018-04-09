import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import StaticRadarChart from 'components/common/radar-chart';
import { pluralize } from 'utils/language';
import roundPercentile from 'utils/round-percentile';

import {
  wrapperStyle, topSectionWrapperStyle, allegationTextStyle, sustainedTextStyle,
  percentileTextStyle, officerInfoTextStyle, bottomSectionWrapperStyle, categoryTextStyle,
  outcomeTextStyle, rankStyle, fullNameStyle, titleWrapperStyle, chartWrapperStyle,
  metricWrapperStyle
} from './coaccused-card.style';


export default class CoaccusedCard extends Component {
  render() {
    const {
      rank, fullname, allegationCount, sustainedCount, allegationPercentile, age, race, gender,
      category, outcome, radarAxes, radarColor, id
    } = this.props;

    return (
      <Link to={ `/officer/${id}/` } style={ wrapperStyle }>
        <div style={ topSectionWrapperStyle }>
          <div>
            <div style={ chartWrapperStyle }>
              <StaticRadarChart
                width={ 38 }
                height={ 38 }
                radius={ 18 }
                hideAxisText={ true }
                data={ radarAxes }
                { ...radarColor }/>
            </div>
            <div style={ titleWrapperStyle }>
              <div style={ rankStyle }>{ rank }</div>
              <div style={ fullNameStyle }>{ fullname }</div>
            </div>
          </div>
          <div style={ metricWrapperStyle } >
            <span style={ allegationTextStyle }>
              { `${allegationCount} ${pluralize('allegation', allegationCount)}` }
            </span>
            <span style={ sustainedTextStyle(sustainedCount) }>{ `${sustainedCount} sustained` }</span>
          </div>
          <div style={ percentileTextStyle }>
            More than { roundPercentile(allegationPercentile) }% of other officers
          </div>
          <div style={ officerInfoTextStyle }>
            { `${age} year old, ${race}, ${gender}.` }
          </div>
        </div>
        <div style={ bottomSectionWrapperStyle }>
          <div style={ categoryTextStyle }>{ category }</div>
          <div style={ outcomeTextStyle }>{ outcome }</div>
        </div>
      </Link>
    );
  }
}

CoaccusedCard.propTypes = {
  rank: PropTypes.string,
  fullname: PropTypes.string,
  allegationCount: PropTypes.number,
  sustainedCount: PropTypes.number,
  allegationPercentile: PropTypes.number,
  radarColor: PropTypes.object,
  radarAxes: PropTypes.array,
  age: PropTypes.number,
  race: PropTypes.string,
  gender: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.number,
  outcome: PropTypes.string
};

CoaccusedCard.defaultProps = {
  percentile: {
    items: []
  }
};
