import React, { Component, PropTypes } from 'react';
import { values, get, mapValues, findKey, map } from 'lodash';

import Item from './item';
import { NEW_TIMELINE_FILTERS, POPUP_NAMES } from 'utils/constants';
import Dropdown from 'components/common/dropdown';
import Popup from 'components/common/popup';
import styles from './timeline.sass';

export default class Timeline extends Component {
  constructor(props) {
    super(props);

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleDropdownChange(label) {
    const key = findKey(NEW_TIMELINE_FILTERS, ['label', label]);
    this.props.changeFilter(NEW_TIMELINE_FILTERS[key]);
  }

  renderHeader() {
    const { popup, filterCount, pathname, selectedFilter } = this.props;
    const options = values(mapValues(NEW_TIMELINE_FILTERS, 'label'));
    const labels = map(
      NEW_TIMELINE_FILTERS,
      (filter, key) => key === 'RANK_UNIT_CHANGES' ? filter.label :`${filter.label} (${filterCount[key]})`
    );

    return (
      <div className='timeline-header no-print'>
        <div className='rank-header'>
          RANK
          <Popup
            { ...get(popup, POPUP_NAMES.OFFICER.RANK) }
            url={ pathname }
          />
        </div>
        <div className='unit-header'>
          UNIT
          <Popup
            { ...get(popup, POPUP_NAMES.OFFICER.UNIT) }
            url={ pathname }
          />
        </div>
        <div className='showing-content-header'>
          <div className='showing-text'>SHOWING</div>
          <Dropdown
            defaultValue={ selectedFilter.label }
            onChange={ this.handleDropdownChange }
            options={ options }
            className='timeline-filter'
            labels={ labels }
          />
        </div>
        <div className='date-header'>DATE</div>
      </div>
    );
  }

  renderItems() {
    const { items, officerId, changeOfficerTab, pathname, onTrackingAttachment } = this.props;

    return (
      <div>
        {
          items.map(item => {
            return (
              <Item
                item={ item }
                key={ item.key }
                officerId={ officerId }
                changeOfficerTab={ changeOfficerTab }
                pathname={ pathname }
                onTrackingAttachment={ onTrackingAttachment }
              />
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className={ styles.timeline }>
        { this.renderHeader() }
        { this.renderItems() }
      </div>
    );
  }
}

Timeline.propTypes = {
  items: PropTypes.array,
  changeFilter: PropTypes.func,
  officerId: PropTypes.number,
  changeOfficerTab: PropTypes.func,
  popup: PropTypes.object,
  filterCount: PropTypes.object,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
  selectedFilter: PropTypes.object,
};

Timeline.defaultProps = {
  items: [],
  filterCount: {},
  selectedFilter: {},
};
