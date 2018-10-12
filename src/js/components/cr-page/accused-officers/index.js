import React, { PropTypes, Component } from 'react';
import pluralize from 'pluralize';

import OfficerCard from '../../common/officer-card';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import {
  wrapperStyle,
  headerStyle,
  accusedOfficersWrapperStyle,
  moreButtonStyle,
  bottomMarginStyle,
} from './accused-officers.style';
import Popup from 'components/common/popup';


export default class AccusedOfficers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  handleExpandList() {
    this.setState({
      expanded: true
    });
  }

  render() {
    const { officers, popup } = this.props;
    const { expanded } = this.state;
    return (
      <div style={ wrapperStyle(expanded) } className='test--accused-officer'>
        <ResponsiveFluidWidthComponent>
          <h2 style={ headerStyle } className='test--accused-officer-title'>
            { `${officers.length} ${pluralize('accused officer', officers.length).toUpperCase()}` }
            <Popup
              { ...popup }
              position='relative'
            />
          </h2>
          <div style={ accusedOfficersWrapperStyle }>
            {
              officers.map(officer => <OfficerCard key={ officer.id } { ...officer }/>)
            }
          </div>
        </ResponsiveFluidWidthComponent>
        <div style={ bottomMarginStyle }/>
        {
          !expanded
            ? <div
              className='test--accused-officer-show-more'
              style={ moreButtonStyle }
              onClick={ this.handleExpandList.bind(this) }>
                Show all accused officers
              </div>
            : null
        }
      </div>
    );
  }
}

AccusedOfficers.propTypes = {
  officers: PropTypes.array,
  expanded: PropTypes.bool,
  popup: PropTypes.object,
};

AccusedOfficers.defaultProps = {
  officers: []
};
