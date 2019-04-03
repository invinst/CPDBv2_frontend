import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';
import { kebabCase } from 'lodash';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './relevant-coaccusal-card.sass';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';


export class RelevantCoaccusalCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { id, addItemToPinboard } = this.props;
    e.preventDefault();
    addItemToPinboard({ type: 'OFFICER', id: id.toString(), isPinned: false });
  }

  render() {
    const {
      id,
      fullName,
      percentile,
      rank,
      coaccusalCount,
    } = this.props;
    const officerSlug = kebabCase(fullName);
    const chartData = percentile && percentile.items;

    return (
      <Link
        to={ `/officer/${id}/${officerSlug}/` }
        className={ styles.relevantCoaccusalCard }
      >
        <div className='no-print radar-chart-wrapper'>
          <StaticRadarChart
            data={ chartData }
            width={ 148 }
            height={ 60 }
            radius={ 28 }
            offsetTop={ 2 }
            backgroundColor={ percentile ? percentile.visualTokenBackground : undefined }
          />
        </div>
        <div className='officer-card-section'>
          <p className='light-text officer-card-rank'>{ rank }</p>
          <p className='bold-text officer-card-name'>{ fullName }</p>
        </div>
        <div className='coaccusal-count'>{ pluralize('coaccusal', coaccusalCount, true) }</div>
        <PlusButton onClick={ this.handleClick }/>
      </Link>
    );
  }
}

RelevantCoaccusalCard.propTypes = {
  id: PropTypes.number,
  fullName: PropTypes.string,
  percentile: PropTypes.object,
  rank: PropTypes.string,
  coaccusalCount: PropTypes.number,
  addItemToPinboard: PropTypes.func,
};

export default RelevantCoaccusalCard;
