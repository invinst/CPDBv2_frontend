import React, { Component, PropTypes } from 'react';
import { map, compact, lowerCase, isEmpty } from 'lodash';
import cx from 'classnames';
import { browserHistory } from 'react-router';

import styles from './new-officer-info-widget.sass';


export default class OfficerInfoWidget extends Component {
  handleClick(to) {
    if (!isEmpty(to)) {
      browserHistory.push(to);
    }
  }

  renderInfo(metric) {
    if (!metric.value) {
      return null;
    }

    return (
      <li
        className={ cx(styles.listItem, { 'has-link': !isEmpty(metric.to) }) } key={ `item-${metric.key}` }
        onClick={ () => this.handleClick(metric.to) }>
        { metric.key && <div className={ styles.itemKey }>{ metric.key }</div> }
        <div
          title={ metric.title }
          className={ cx(styles.itemValue, { 'has-key': !!metric.key }) }
        >
          { metric.value }
        </div>
        <div className='clear-fix'/>
      </li>
    );
  }

  render() {
    const {
      fullName,
      age,
      race,
      gender,
      badge,
      rank,
      unit,
      appointedDate,
      resignationDate,
    } = this.props;

    const raceString = race ? lowerCase(race) : null;
    const genderString = gender ? lowerCase(gender) : null;
    const geographicInfo = compact([age, raceString, genderString]);

    const listInfo = [
      {
        key: '',
        value: !isEmpty(geographicInfo) ? `${geographicInfo.join(', ')}.` : null,
      },
      {
        key: 'Badge',
        value: badge,
      },
      {
        key: 'Rank',
        value: rank,
      },
      {
        key: 'Unit',
        to: `/unit/${unit.unitName}/`,
        value: unit.description || unit.unitName,
        title: unit.description,
      },
      {
        key: 'Career',
        value: `${appointedDate || 'Unknown'} — ${resignationDate || 'Present'}`,
      },
    ];

    return (
      <div className={ styles.wrapper }>
        <h1 className={ cx('test--officer-name', styles.title) }>{ fullName }</h1>
        <ul className={ styles.list }>
          {
            map(listInfo, metric => this.renderInfo(metric))
          }
        </ul>
      </div>
    );
  }
}

OfficerInfoWidget.defaultProps = {
  unit: {},
  appointedDate: null,
  resignationDate: null,
};

OfficerInfoWidget.propTypes = {
  fullName: PropTypes.string.isRequired,
  age: PropTypes.number,
  race: PropTypes.string,
  gender: PropTypes.string,
  badge: PropTypes.string,
  rank: PropTypes.string,
  unit: PropTypes.shape({
    id: PropTypes.number,
    unitName: PropTypes.string,
    description: PropTypes.string,
  }),
  appointedDate: PropTypes.string.isRequired,
  resignationDate: PropTypes.string,
};
