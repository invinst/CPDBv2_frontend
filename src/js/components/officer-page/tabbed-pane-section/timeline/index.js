import React, { Component, PropTypes } from 'react';
import { nth, values, get, includes } from 'lodash';

import {
  dateHeaderStyle,
  headerWrapperStyle,
  rankHeaderStyle,
  showingContentHeaderStyle,
  showingTextStyle,
  timelineStyle,
  unitHeaderStyle,
  popupStyle,
} from './timeline.style';
import Item from './item';
import { NEW_TIMELINE_FILTERS, NEW_TIMELINE_ITEMS, POPUP_NAMES } from 'utils/constants';
import Dropdown from 'components/common/dropdown';
import Popup from 'components/common/popup';

export default class Timeline extends Component {

  renderHeader() {
    const { changeFilter, popup, filterCount } = this.props;
    const options = values(NEW_TIMELINE_FILTERS);
    const labels = options.map(option => `${option} (${filterCount[option]})`);

    return (
      <div className='test--timeline-header' style={ headerWrapperStyle }>
        <div style={ rankHeaderStyle } className='test--timeline-header-col'>
          RANK
          <Popup
            { ...get(popup, POPUP_NAMES.OFFICER.RANK) }
            style={ popupStyle }
          />
        </div>
        <div style={ unitHeaderStyle } className='test--timeline-header-col'>
          UNIT
          <Popup
            { ...get(popup, POPUP_NAMES.OFFICER.UNIT) }
            style={ popupStyle }
          />
        </div>
        <div style={ showingContentHeaderStyle } className='test--timeline-header-col'>
          <div style={ showingTextStyle }>SHOWING</div>
          <Dropdown
            defaultValue={ NEW_TIMELINE_FILTERS.ALL }
            onChange={ changeFilter }
            options={ options }
            className='test--timeline-filter'
            width={ 146 }
            labels={ labels }
          />
        </div>
        <div style={ dateHeaderStyle } className='test--timeline-header-col'>DATE</div>
      </div>
    );
  }

  renderItems() {
    const { items, officerId, openComplaintPage, changeOfficerTab } = this.props;

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
                openComplaintPage={ openComplaintPage }
                changeOfficerTab={ changeOfficerTab }
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
  openComplaintPage: PropTypes.func,
  changeOfficerTab: PropTypes.func,
  popup: PropTypes.object,
  filterCount: PropTypes.object,
};

Timeline.defaultProps = {
  items: [],
  filterCount: {},
};
