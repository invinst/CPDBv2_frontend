import React, { PropTypes, Component } from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';

import OfficerCard from 'components/common/officer-card';
import Popup from 'components/common/popup';
import CoaccusedCardFooter from './coaccused-card-footer';
import styles from './accused-officers.sass';


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
      <div className={ cx(styles.accusedOfficers, 'test--accused-officer', { 'expanded': expanded }) }>
        <h2 className='accused-officer-title'>
          { `${officers.length} ${pluralize('accused officer', officers.length).toUpperCase()}` }
          <Popup
            { ...popup }
            position='relative'
            url={ pathName }
          />
        </h2>
        <div className='accused-officers-wrapper'>
          {
            officers.map(officer => (
              <OfficerCard
                key={ officer.id } { ...officer }
                className={ styles.officerCard }
                footer={
                  <CoaccusedCardFooter
                    finding={ officer.finding }
                    disciplined={ officer.disciplined }
                    category={ officer.category }
                    findingOutcomeMix={ officer.findingOutcomeMix }
                  />
                }
              />
            ))
          }
        </div>
        {
          !expanded
            ? (
              <div
                className='show-more-button'
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
