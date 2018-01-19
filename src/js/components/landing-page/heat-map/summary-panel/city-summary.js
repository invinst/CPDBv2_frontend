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
      <div style={ wrapperStyle(isActive) } className='link--transition' onClick={ onClick }>
        <div style={ headerStyle }>CHICAGO 2000 - 2016</div>
        <div style={ allegationDisciplineStyle }>
          <div style={ allegationTextStyle }>{ allegationCount } allegations</div>
          <div style={ disciplineTextStyle }>{ disciplineCount } disciplines</div>
        </div>
        <div>
          <div style={ mostCommonComplaintStyle }>MOST COMMON COMPLAINT</div>
          <div>
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
