import React, { PropTypes, Component } from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';

import OfficerCard from 'components/common/officer-card';
import Popup from 'components/common/popup';
import CoaccusedCardFooter from './coaccused-card-footer';
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
                <OfficerCard
                  { ...officer }
                  footer={
                    <CoaccusedCardFooter
                      finding={ officer.finding }
                      disciplined={ officer.disciplined }
                      category={ officer.category }
                      findingOutcomeMix={ officer.findingOutcomeMix }
                    />
                  }
                />
              </div>
            ))
          }
        </div>
        {
          !expanded
            ? (
              <div
                className='show-more-button no-print'
                onClick={ this.handleExpandList.bind(this) }>
                Show all accused officers
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
