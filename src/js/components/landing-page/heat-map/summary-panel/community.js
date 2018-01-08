import React, { PropTypes, Component } from 'react';

import {
  communityHeaderStyle, communityStyle, communityItemStyle,
  communityBodyStyle, complaintsCountStyle, sustainedCountStyle,
  communityTitleStyle, communityCategoryStyle,
  communityLastItemStyle, seeMoreButtonStyle, indicatorStyle
} from './community.style';
import { communityUrl } from 'utils/v1-url';


export default class Community extends Component {
  render() {
    const { community } = this.props;

    return (
      <div>
        <div style={ communityStyle }>
          <div style={ communityHeaderStyle }>{ community['name'] }</div>
          <div style={ communityBodyStyle }>
            <div style={ communityItemStyle }>
              <div>
                <span style={ complaintsCountStyle }>{ community['complaints_count'] } Complaints, </span>
                <span style={ sustainedCountStyle }>{ community['sustaineds_count'] } Sustained</span>
              </div>
            </div>
            <div style={ communityLastItemStyle }>
              <span style={ communityTitleStyle }>Most Common Discipline</span>
              <span style={ communityCategoryStyle }>{ community['most_common_discipline'] }</span>
            </div>
          </div>
        </div>
        <a style={ seeMoreButtonStyle } href={ communityUrl(community['name']) }>
          See more <i style={ indicatorStyle }/>
        </a>
      </div>
    );
  }
}

Community.propTypes = {
  community: PropTypes.object
};

Community.defaultProps = {
  community: {}
};
