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
} from './timeline.style';
import Item from './item';
import { NEW_TIMELINE_FILTERS, NEW_TIMELINE_ITEMS } from 'utils/constants';
import Dropdown from 'components/common/dropdown';


export default class Timeline extends Component {

  renderHeader() {
    const { changeFilter } = this.props;

    return (
      <div className='test--timeline-header' style={ headerWrapperStyle }>
        <div style={ rankHeaderStyle }>RANK</div>
        <div style={ unitHeaderStyle }>UNIT</div>
        <div style={ showingContentHeaderStyle }>
          <div style={ showingTextStyle }>SHOWING</div>
          <Dropdown
            defaultValue={ NEW_TIMELINE_FILTERS.ALL }
            onChange={ changeFilter }
            options={ values(NEW_TIMELINE_FILTERS) }
            className='test--timeline-filter'
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
