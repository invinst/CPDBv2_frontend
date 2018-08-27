import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import {
  officersWrapperStyle, officersHeaderStyle, officerTextStyle, officerNameTextStyle,
  officerItemStyle, complaintsCountStyle, rightArrowStyle
} from './community-officers.style';


export default class CommunityOfficers extends Component {
  render() {
    const { mostComplaintsOfficers, communityName } = this.props;
    return (
      <div style={ officersWrapperStyle } className='test--community-officers'>
        <div style={ officersHeaderStyle }>OFFICERS WITH MOST ALLEGATIONS</div>
        <div>
          {
            map(mostComplaintsOfficers, (officer, index) => (
              <Link
                to={ `/officer/${officer.id}/${officer.officerSlug}/` }
                style={ officerItemStyle(index === mostComplaintsOfficers.length - 1) }
                key={ officer.id }>
                <span style={ officerTextStyle }>
                  <div style={ officerNameTextStyle }>{ officer.fullName }</div>
                  <div style={ complaintsCountStyle }>{ officer.complaintsCount } complaints in { communityName }</div>
                </span>
                <span style={ rightArrowStyle }/>
              </Link>
            ))
          }
        </div>
      </div>
    );
  }
}

CommunityOfficers.propTypes = {
  mostComplaintsOfficers: PropTypes.array,
  communityName: PropTypes.string
};
