import React, { PropTypes, Component } from 'react';
import pluralize from 'pluralize';
import { get, noop } from 'lodash';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './relevant-coaccusal-card.sass';
import withUndoCard from 'components/pinboard-page/cards/with-undo-card';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';
import * as constants from 'utils/constants';


export default class RelevantCoaccusalCard extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    const { id, rawData, addItemInPinboardPage } = this.props;

    addItemInPinboardPage({
      type: 'OFFICER',
      id,
      rawData
    });
  }

  handleFocus() {
    const { id, focusItem } = this.props;
    focusItem({ type: 'OFFICER', id });
  }

  render() {
    const {
      fullName,
      percentile,
      rank,
      coaccusalCount,
    } = this.props;
    const chartData = percentile && percentile.items;

    return (
      <div className={ styles.relevantCoaccusalCard }>
        <div onClick={ this.handleFocus }>
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
        </div>
        <PlusButton onClick={ this.handleClick }/>
      </div>
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
  focusItem: PropTypes.func,
  rawData: PropTypes.object,
};

RelevantCoaccusalCard.defaultProps = {
  addItemInPinboardPage: noop,
  focusItem: noop,
  rawData: {},
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
