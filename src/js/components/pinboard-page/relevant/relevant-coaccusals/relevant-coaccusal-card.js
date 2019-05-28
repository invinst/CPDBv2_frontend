import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';
import { kebabCase, get } from 'lodash';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './relevant-coaccusal-card.sass';
import withUndoCard from 'components/pinboard-page/cards/with-undo-card';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';
import * as constants from 'utils/constants';


export default class RelevantCoaccusalCard extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    const {
      id,
      fullName,
      percentile,
      rank,
      complaintCount,
      addItemInPinboardPage,
    } = this.props;
    addItemInPinboardPage({
      type: 'OFFICER',
      id: id.toString(),
      fullName,
      percentile,
      complaintCount,
      rank,
    });
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
        <div className='officer-name-wrapper'>
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
  complaintCount: PropTypes.number,
  addItemInPinboardPage: PropTypes.func,
};


export const RelevantCoaccusalCardWithUndo = withUndoCard(
  RelevantCoaccusalCard,
  props => `${get(props, 'fullName', '')} added.`,
  'addItemInPinboardPage',
  {
    theme: constants.UNDO_CARD_THEMES.DARK,
    keepVisible: false,
    hasWrapper: false,
  }
);
