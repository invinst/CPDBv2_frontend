import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isNil, noop, isEmpty } from 'lodash';
import MediaQuery from 'react-responsive';
import cx from 'classnames';

import browserHistory from 'utils/history';
import {
  NewVisualTokenWidget as VisualTokenWidget,
  NewOfficerInfoWidget as OfficerInfoWidget,
  NewMetricWidget as MetricWidget,
  PinButton,
} from '../widgets';
import styles from './officer-pane.sass';

export default class OfficerPane extends Component {
  handleOnOfficerProfileClick = () => {
    const { to } = this.props;

    if (!isEmpty(to)) {
      browserHistory.push(to);
    }
  };

  render() {
    const {
      fullName,
      age,
      appointedDate,
      resignationDate,
      unit,
      rank,
      badge,
      race,
      gender,
      complaintCount,
      complaintPercentile,
      sustainedCount,
      disciplineCount,
      trrCount,
      trrPercentile,
      civilianComplimentCount,
      honorableMentionCount,
      majorAwardCount,
      honorableMentionPercentile,
      lastPercentile,
      isPinned,
      yScrollable,
      pinnable,
      maxHeight,
      type,
      id,
      addOrRemoveItemInPinboard,
    } = this.props;

    const formatValue = (value) => isNil(value) ? 'N/A' : value;
    const metrics = [
      {
        name: 'Allegations',
        value: formatValue(complaintCount),
        description: complaintPercentile > 0 ? `More than ${complaintPercentile}% of other officers` : '',
      },
      {
        name: 'Sustained',
        value: formatValue(sustainedCount),
        isHighlight: true,
        description: !isNil(disciplineCount) ? `${disciplineCount} Disciplined` : '',
      },
      {
        name: 'Use of Force Reports',
        value: formatValue(trrCount),
        description: trrPercentile > 0 ? `More than ${trrPercentile}% of other officers` : '',
      },
      {
        name: <span>Civilian<br/>Compliments</span>,
        value: formatValue(civilianComplimentCount),
      },
      {
        name: 'Major Awards',
        value: formatValue(majorAwardCount),
      },
      {
        name: 'Honorable Mentions',
        value: formatValue(honorableMentionCount),
        description: honorableMentionPercentile > 0 ? `More than ${honorableMentionPercentile}% of other officers` : '',
      },
    ];
    return (
      <div className={ styles.wrapper }>
        <div className={ styles.officerPane }>
          {
            pinnable &&
            <PinButton
              item={ { type, id, isPinned, fullName, complaintCount, sustainedCount, age, race, gender, rank } }
              className={ cx('pin-button', { 'is-pinned': isPinned }) }
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
            />
          }
          <button className='view-officer-profile-button' onClick={ this.handleOnOfficerProfileClick }>
            View Officer Profile
          </button>
          <VisualTokenWidget { ...lastPercentile }/>
          <OfficerInfoWidget
            fullName={ fullName }
            appointedDate={ appointedDate }
            resignationDate={ resignationDate }
            age={ age }
            unit={ unit }
            rank={ rank }
            badge={ badge }
            race={ race }
            gender={ gender }
          />
          <MetricWidget metrics={ metrics }/>
          { !yScrollable &&
            <MediaQuery maxHeight={ maxHeight }>
              <div className='gradient test--gradient' />
            </MediaQuery>
          }
        </div>
      </div>
    );
  }
}

OfficerPane.propTypes = {
  id: PropTypes.number,
  fullName: PropTypes.string,
  age: PropTypes.number,
  appointedDate: PropTypes.string,
  resignationDate: PropTypes.string,
  unit: PropTypes.shape({
    id: PropTypes.number,
    unitName: PropTypes.string,
    description: PropTypes.string,
  }),
  rank: PropTypes.string,
  badge: PropTypes.string,
  race: PropTypes.string,
  gender: PropTypes.string,
  complaintCount: PropTypes.number,
  complaintPercentile: PropTypes.number,
  sustainedCount: PropTypes.number,
  disciplineCount: PropTypes.number,
  trrCount: PropTypes.number,
  trrPercentile: PropTypes.number,
  civilianComplimentCount: PropTypes.number,
  majorAwardCount: PropTypes.number,
  honorableMentionCount: PropTypes.number,
  honorableMentionPercentile: PropTypes.number,
  to: PropTypes.string,
  lastPercentile: PropTypes.shape({
    items: PropTypes.array,
    visualTokenBackground: PropTypes.string,
  }),
  yScrollable: PropTypes.bool,
  isPinned: PropTypes.bool,
  type: PropTypes.string,
  addOrRemoveItemInPinboard: PropTypes.func,
  pinnable: PropTypes.bool,
  maxHeight: PropTypes.number,
};

OfficerPane.defaultProps = {
  id: 0,
  yScrollable: false,
  isPinned: false,
  type: '',
  addOrRemoveItemInPinboard: noop,
  pinnable: true,
  maxHeight: 990,
};
