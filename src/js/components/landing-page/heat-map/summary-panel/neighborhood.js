import React, { PropTypes, Component } from 'react';

import {
  neighborhoodHeaderStyle, neighborhoodStyle, neighborhoodItemStyle,
  neighborhoodBodyStyle, complaintsCountStyle, sustainedCountStyle,
  comparisonTextStyle, neighborhoodTitleStyle, neighborhoodCategoryStyle,
  neighborhoodLastItemStyle, seeMoreButtonStyle, indicatorStyle
} from './neighborhood.style';
import { neighborhoodUrl } from 'utils/v1-url';


export default class Neighborhood extends Component {
  render() {
    const { neighborhood } = this.props;

    return (
      <div>
        <div style={ neighborhoodStyle }>
          <div style={ neighborhoodHeaderStyle }>{ neighborhood['name'] }</div>
          <div style={ neighborhoodBodyStyle }>
            <div style={ neighborhoodItemStyle }>
              <div>
                <span style={ complaintsCountStyle }>{ neighborhood['complaints_count'] } Complaints, </span>
                <span style={ sustainedCountStyle }>{ neighborhood['sustaineds_count'] } Sustained</span>
              </div>
              <div style={ comparisonTextStyle }>
                More/Less complaints per capita than NN% of other neighborhoods
              </div>
            </div>
            <div style={ neighborhoodLastItemStyle }>
              <span style={ neighborhoodTitleStyle }>Most Common Discipline</span>
              <span style={ neighborhoodCategoryStyle }>{ neighborhood['most_common_discipline'] }</span>
            </div>
          </div>
        </div>
        <a style={ seeMoreButtonStyle } href={ neighborhoodUrl(neighborhood['name']) }>
          See more <i style={ indicatorStyle }/>
        </a>
      </div>
    );
  }
}

Neighborhood.propTypes = {
  neighborhood: PropTypes.object
};

Neighborhood.defaultProps = {
  neighborhood: {}
};
