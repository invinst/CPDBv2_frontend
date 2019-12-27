import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import { communityUrl } from 'utils/v1-url';
import {
  communityWrapperStyle, headerStyle, allegationDisciplineStyle,
  allegationTextStyle, disciplineTextStyle, headerTextStyle,
  learnMoreStyle, learnMoreTextStyle, rightArrowBlueStyle,
  closeButtonStyle,
} from './community-detail.style';
import CommunityOfficers from './community-officers';
import OutboundLink from 'components/common/outbound-link';


export default class CommunityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevCommunity: {},
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEmpty(props.community))
      return { prevCommunity: props.community };
    return null;
  }

  shouldComponentUpdate(nextProps) {
    const community = this.getCommunity();
    return !isEmpty(nextProps.community) && nextProps.community.id !== community.id;
  }

  getCommunity() {
    const { community } = this.props;
    if (!isEmpty(community)) {
      return community;
    }
    return this.state.prevCommunity;
  }

  render() {
    const { closeDetail } = this.props;
    const { name, allegationCount, disciplineCount, mostComplaintsOfficers } = this.getCommunity();

    return (
      <div style={ communityWrapperStyle }>
        <div style={ headerStyle }>
          <span style={ headerTextStyle }>{ name }</span>
          <span className='test--community-close-btn' style={ closeButtonStyle } onClick={ closeDetail }/>
        </div>
        <div style={ allegationDisciplineStyle }
          className='test--community-allegation-discipline'>
          <span style={ allegationTextStyle }>{ allegationCount } allegations </span>
          <span style={ disciplineTextStyle }>{ disciplineCount } disciplines</span>
        </div>
        <CommunityOfficers mostComplaintsOfficers={ mostComplaintsOfficers } communityName={ name }/>
        <OutboundLink
          className='test--community-v1-link'
          style={ learnMoreStyle }
          href={ communityUrl(name) }>
          <span style={ learnMoreTextStyle }>Explore data</span>
          <span style={ rightArrowBlueStyle }/>
        </OutboundLink>
      </div>
    );
  }
}

CommunityDetail.propTypes = {
  community: PropTypes.object,
  closeDetail: PropTypes.func,
};
