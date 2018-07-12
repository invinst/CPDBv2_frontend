import React, { Component, PropTypes } from 'react';
import { nth, values } from 'lodash';

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
import { NEW_TIMELINE_FILTERS, NEW_TIMELINE_ITEMS } from 'utils/constants';
import Dropdown from 'components/common/dropdown';
import Popup from 'components/common/popup';


export default class Timeline extends Component {

  renderHeader() {
    const { changeFilter } = this.props;

    return (
      <div className='test--timeline-header' style={ headerWrapperStyle }>
        <div style={ rankHeaderStyle }>RANK</div>
        <div style={ unitHeaderStyle }>
          UNIT
          <Popup
            title='Unit Details'
            text='This field provides the CPD unit an officer was assigned to at a given point in time.
            Officers are often detailed from their assigned unit to a second unit for periods of time ranging from a
            few days to months at a time. This means that an officer assigned to the Third District (Unit 003) might
            spend weeks outside of the district while detailed to the Narcotics Division (Unit 189).'
            style={ popupStyle }
          />
        </div>
        <div style={ showingContentHeaderStyle }>
          <div style={ showingTextStyle }>SHOWING</div>
          <Dropdown
            defaultValue={ NEW_TIMELINE_FILTERS.ALL }
            onChange={ changeFilter }
            options={ values(NEW_TIMELINE_FILTERS) }
            className='test--timeline-filter'
            width={ 146 }
          />
        </div>
        <div style={ dateHeaderStyle }>DATE</div>
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

            const hasBorderBottom = (
              item.kind !== NEW_TIMELINE_ITEMS.UNIT_CHANGE
              && nextItem !== undefined
              && nextItem.kind !== NEW_TIMELINE_ITEMS.UNIT_CHANGE
              && nextItem.kind !== NEW_TIMELINE_ITEMS.JOINED
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
};

Timeline.defaultProps = {
  items: [],
};
