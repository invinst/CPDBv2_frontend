import React, { PropTypes, Component } from 'react';
import { map, isEmpty } from 'lodash';
import { Link } from 'react-router';

import { communityUrl } from 'utils/v1-url';
import {
  communityWrapperStyle, headerStyle, allegationDisciplineStyle,
  allegationTextStyle, disciplineTextStyle, racePopulationStyle,
  columnStyle, labelTextStyle, raceTextStyle, raceItemStyle,
  raceCountStyle, populationCountStyle, medianIncomeStyle,
  officersHeaderStyle, officersWrapperStyle, officerItemStyle,
  officerNameTextStyle, complaintsCountStyle, learnMoreStyle,
  rightArrowStyle, learnMoreTextStyle, rightArrowBlueStyle,
  officerTextStyle, closeButtonStyle, headerTextStyle
} from './community-detail.style';


export default class CommunityDetail extends Component {
  constructor(props) {
    super(props);
    this.prevCommunity = {};
  }

  componentWillReceiveProps() {
    this.prevCommunity = this.props.community || this.prevCommunity;
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
    return this.prevCommunity;
  }

  render() {
    const { closeDetail } = this.props;
    const {
      name, allegationCount, disciplineCount, population, medianIncome,
      raceCount, mostComplaintsOfficers
    } = this.getCommunity();

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
        <div style={ racePopulationStyle } className='test--community-race-population'>
          <div style={ columnStyle }>
            <div>
              <div style={ labelTextStyle }>Population</div>
              <div style={ populationCountStyle }>{ population }</div>
            </div>
            <div>
              <div style={ labelTextStyle }>Median Household Income</div>
              <div style={ medianIncomeStyle }>{ medianIncome }</div>
            </div>
          </div>
          <div style={ columnStyle }>
            <div style={ labelTextStyle }>Race</div>
            {
              map(raceCount, race => (
                <div key={ race.race } style={ raceItemStyle }>
                  <span style={ raceTextStyle }>{ race.race }</span>
                  <span style={ raceCountStyle }>{ race.count }</span>
                </div>
              ))
            }
          </div>
        </div>
        <div style={ officersWrapperStyle } className='test--community-officers'>
          <div style={ officersHeaderStyle }>OFFICERS WITH MOST ALLEGATIONS</div>
          <div>
            {
              map(mostComplaintsOfficers, (officer, index) => (
                <Link
                  to={ `/officer/${officer.id}` }
                  style={ officerItemStyle(index === mostComplaintsOfficers.length - 1) }
                  key={ officer.id }>
                  <span style={ officerTextStyle }>
                    <div style={ officerNameTextStyle }>{ officer.fullName }</div>
                    <div style={ complaintsCountStyle }>{ officer.complaintsCount } complaints in { name }</div>
                  </span>
                  <span style={ rightArrowStyle }/>
                </Link>
              ))
            }
          </div>
          <a
            className='test--community-v1-link'
            style={ learnMoreStyle }
            href={ communityUrl(name) }>
            <span style={ learnMoreTextStyle }>Learn more</span>
            <span style={ rightArrowBlueStyle }/>
          </a>
        </div>
      </div>
    );
  }
}

CommunityDetail.propTypes = {
  community: PropTypes.object,
  closeDetail: PropTypes.func
};
