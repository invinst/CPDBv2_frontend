import React, { PropTypes, Component } from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';

import CoaccusedCard from './coaccused-card';
import Popup from 'components/common/popup';
import style from './accused-officers.sass';
import CoaccusedPopup from './coaccused-popup';


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
    const { officers, popup, pathName } = this.props;
    const { expanded } = this.state;
    return (
      <div className={ cx(style.accusedOfficers, 'test--accused-officer', { 'expanded': expanded }) }>
        <h2 className='accused-officer-title'>
          { `${officers.length} ${pluralize('accused officer', officers.length).toUpperCase()}` }
          <Popup
            { ...popup }
            url={ pathName }
          />
        </h2>
        <div className='accused-officers-wrapper'>
          {
            officers.map(officer => (
              <div key={ officer.id } className='accused-officer-card'>
                <CoaccusedPopup
                  finding={ officer.finding }
                  outcome={ officer.outcome }
                  recommendedOutcome={ officer.recommendedOutcome }
                />
                <CoaccusedCard { ...officer } />
              </div>
            ))
          }
        </div>
        {
          !expanded
            ? (
              <div className='show-more-button-container no-print'>
                <span onClick={ this.handleExpandList.bind(this) } className='show-more-button'>
                  Show all accused officers
                </span>
              </div>
            )
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
  pathName: PropTypes.string,
};

AccusedOfficers.defaultProps = {
  officers: []
};
