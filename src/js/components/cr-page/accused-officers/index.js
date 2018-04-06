import React, { PropTypes, Component } from 'react';

import CoaccusedCard from './coaccused-card';
import { pluralize } from 'utils/language';
import {
  wrapperStyle, headerStyle, accusedOfficersWrapperStyle, moreButtonStyle, bottomMarginStyle
} from './accused-officers.style';


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
    const { officers } = this.props;
    const { expanded } = this.state;
    return (
      <div style={ wrapperStyle(expanded) }>
        <h2 style={ headerStyle }>
          { `${officers.length} ${pluralize('accused officer', officers.length).toUpperCase()}` }
        </h2>
        <div style={ accusedOfficersWrapperStyle }>
          {
            officers.map(officer => <CoaccusedCard key={ officer.id } { ...officer }/>)
          }
        </div>
        <div style={ bottomMarginStyle }/>
        {
          !expanded
            ? <div
              className='test--accused-show-more-button'
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
  expanded: PropTypes.bool
};

AccusedOfficers.defaultProps = {
  officers: []
};
