import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import {
  wrapperStyle, headerStyle, allegationDisciplineStyle, allegationTextStyle, disciplineTextStyle,
  mostCommonComplaintStyle, categoryStyle
} from './city-summary.style';


export default class CitySummary extends Component {
  componentDidMount() {
    this.props.getCitySummary();
  }

  render() {
    const { citySummary, isActive, onClick } = this.props;
    const { allegationCount, disciplineCount, mostCommonComplaints } = citySummary;

    return (
      <div style={ wrapperStyle(isActive) }
        className='link--transition test--city-summary'
        onClick={ onClick }>
        <div style={ headerStyle }>CHICAGO 2000 - 2016</div>
        <div style={ allegationDisciplineStyle }
          className='test--allegation-discipline-count'>
          <div style={ allegationTextStyle }>
            {
              allegationCount ?
                `${allegationCount.toLocaleString()} allegations` :
                null
            }
          </div>
          <div style={ disciplineTextStyle }>
            {
              disciplineCount ?
                `${disciplineCount.toLocaleString()} disciplines` :
                null
            }
          </div>
        </div>
        <div>
          <div style={ mostCommonComplaintStyle }>MOST COMMON COMPLAINT</div>
          <div className='test--most-common-complaints'>
            {
              map(mostCommonComplaints, (category, index) => (
                <div key={ index } style={ categoryStyle(index === mostCommonComplaints.length - 1) }>
                  { category }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

CitySummary.propTypes = {
  citySummary: PropTypes.object,
  getCitySummary: PropTypes.func,
  onClick: PropTypes.func,
  isActive: PropTypes.bool
};

CitySummary.defaultProps = {
  citySummary: {},
  getCitySummary: () => {}
};
