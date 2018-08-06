import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import config from 'config';
import { categoryUrl } from 'utils/v1-url';
import {
  wrapperStyle, headerStyle, allegationDisciplineStyle, allegationTextStyle, disciplineTextStyle,
  mostCommonComplaintStyle, categoryStyle, categoryNameStyle, rightArrowStyle, categoryTextWrapper,
  clickReceiver, allegationDisciplineCountStyle
} from './city-summary.style';
import OutboundLink from 'components/common/outbound-link';


export default class CitySummary extends Component {
  render() {
    const { citySummary, isActive, onClick } = this.props;
    const { allegationCount, disciplinePercentage, mostCommonComplaints } = citySummary;

    return (
      <div style={ wrapperStyle(isActive) }
        className='link--transition test--city-summary'>
        {
          isActive ?
            null :
            <div style={ clickReceiver } onClick={ onClick }/>
        }
        <div style={ headerStyle }>CHICAGO 1988 - 2018</div>
        <div style={ allegationDisciplineStyle }
          className='test--allegation-discipline-count'>
          <OutboundLink href={ config.v1Url }>
            <div style={ allegationDisciplineCountStyle }>
              <div style={ allegationTextStyle }>
                {
                  allegationCount ?
                    `${allegationCount.toLocaleString()} allegations` :
                    null
                }
              </div>
              <div style={ disciplineTextStyle }>
                {
                  disciplinePercentage ?
                    `${ disciplinePercentage }% disciplined` :
                    null
                }
              </div>
            </div>
            <div style={ rightArrowStyle }/>
          </OutboundLink>
        </div>
        <div>
          <div style={ mostCommonComplaintStyle }>MOST COMMON COMPLAINTS</div>
          <div className='test--most-common-complaints'>
            {
              map(mostCommonComplaints, ({ name, count }, index) => (
                <OutboundLink
                  className='test--complaint-category'
                  href={ isActive ? categoryUrl(name) : null }
                  key={ index }
                  style={ categoryStyle(index === mostCommonComplaints.length - 1) }>
                  <div style={ categoryTextWrapper }>
                    <div style={ categoryNameStyle }>{ name }</div>
                    <div>{ count.toLocaleString() } allegations</div>
                  </div>
                  <div style={ rightArrowStyle }/>
                </OutboundLink>
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
  onClick: PropTypes.func,
  isActive: PropTypes.bool
};

CitySummary.defaultProps = {
  citySummary: {}
};
