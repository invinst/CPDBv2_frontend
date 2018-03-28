import React, { Component, PropTypes } from 'react';
import { nth, includes } from 'lodash';

import {
  dateHeaderStyle,
  headerWrapperStyle,
  rankHeaderStyle,
  showingContentHeaderStyle,
  timelineStyle,
  unitHeaderStyle,
} from './timeline.style';

import Item from './item';
import { NEW_TIMELINE_ITEMS } from 'utils/constants';


export default class Timeline extends Component {

  renderHeader() {
    return (
      <div className='test--timeline-header' style={ headerWrapperStyle }>
        <div style={ rankHeaderStyle }>RANK</div>
        <div style={ unitHeaderStyle }>UNIT</div>
        <div style={ showingContentHeaderStyle }>SHOWING</div>
        <div style={ dateHeaderStyle }>DATE</div>
      </div>
    );
  }

  renderItems() {
    const { items } = this.props;

    return (
      <div>
        {
          items.map((item, index) => {
            if ( item.kind === NEW_TIMELINE_ITEMS.UNIT_CHANGE) {
              return <Item item={ item } key={ index } hasBorderBottom={ false } />;
            }

            const nextItem = nth(items, index + 1);

            if ( !nextItem || includes([NEW_TIMELINE_ITEMS.UNIT_CHANGE, NEW_TIMELINE_ITEMS.JOINED], nextItem.kind)) {
              return <Item item={ item } key={ index } hasBorderBottom={ false } />;
            } else {
              return <Item item={ item } key={ index } hasBorderBottom={ true } />;
            }
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div style={ timelineStyle }>
        { this.renderHeader() }
        { this.renderItems() }
      </div>
    );
  }
}

Timeline.propTypes = {
  items: PropTypes.array,
};

Timeline.defaultProps = {
  items: [],
};
