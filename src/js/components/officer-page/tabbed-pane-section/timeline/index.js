import React, { Component, PropTypes } from 'react';
import { nth, values, get, includes, mapValues, findKey, map } from 'lodash';

import {
  dateHeaderStyle,
  headerWrapperStyle,
  rankHeaderStyle,
  showingContentHeaderStyle,
  showingTextStyle,
  timelineStyle,
  unitHeaderStyle,
} from './timeline.style';
import Item from './item';
import { NEW_TIMELINE_FILTERS, NEW_TIMELINE_ITEMS, POPUP_NAMES } from 'utils/constants';
import Dropdown from 'components/common/dropdown';
import Popup from 'components/common/popup';

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
    const { popup, filterCount, pathname } = this.props;
    const options = values(mapValues(NEW_TIMELINE_FILTERS, 'label'));
    const labels = map(
      NEW_TIMELINE_FILTERS,
      (filter, key) => key === 'RANK_UNIT_CHANGES' ? filter.label :`${filter.label} (${filterCount[key]})`
    );

    return (
      <div className='test--timeline-header' style={ headerWrapperStyle }>
        <div style={ rankHeaderStyle } className='test--timeline-header-col'>
          RANK
          <Popup
            { ...get(popup, POPUP_NAMES.OFFICER.RANK) }
            position='relative'
            url={ pathname }
          />
        </div>
        <div style={ unitHeaderStyle } className='test--timeline-header-col'>
          UNIT
          <Popup
            { ...get(popup, POPUP_NAMES.OFFICER.UNIT) }
            position='relative'
            url={ pathname }
          />
        </div>
        <div style={ showingContentHeaderStyle } className='test--timeline-header-col'>
          <div style={ showingTextStyle }>SHOWING</div>
          <Dropdown
            defaultValue={ NEW_TIMELINE_FILTERS.ALL.label }
            onChange={ this.handleDropdownChange }
            options={ options }
            className='test--timeline-filter'
            width={ 176 }
            labels={ labels }
          />
        </div>
        <div style={ dateHeaderStyle } className='test--timeline-header-col'>DATE</div>
      </div>
    );
  }

  renderItems() {
    const { items, officerId, changeOfficerTab, pathname } = this.props;

    return (
      <div>
        {
          items.map((item, index) => {
            const nextItem = nth(items, index + 1);
            const excludedKinds = [
              NEW_TIMELINE_ITEMS.UNIT_CHANGE, NEW_TIMELINE_ITEMS.RANK_CHANGE, NEW_TIMELINE_ITEMS.JOINED
            ];

            const hasBorderBottom = (
              item.isFirstMutual
              || !includes(excludedKinds, item.kind)
              && nextItem !== undefined
              && !includes(excludedKinds, nextItem.kind)
            );

            return (
              <Item
                item={ item }
                key={ item.key }
                officerId={ officerId }
                hasBorderBottom={ hasBorderBottom }
                changeOfficerTab={ changeOfficerTab }
                pathname={ pathname }
              />
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div style={ timelineStyle } className='test--officer-timeline'>
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
};

Timeline.defaultProps = {
  items: [],
  filterCount: {},
};
