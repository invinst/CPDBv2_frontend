import React, { Component, PropTypes } from 'react';
import { includes, nth, values } from 'lodash';
import Select from 'react-select';

import {
  dateHeaderStyle,
  filterWrapperStyle,
  headerWrapperStyle,
  rankHeaderStyle,
  showingContentHeaderStyle,
  showingTextStyle,
  timelineStyle,
  unitHeaderStyle,
  filterStyle,
  filterMenuStyle,
} from './timeline.style';
import Item from './item';
import { NEW_TIMELINE_FILTERS, NEW_TIMELINE_ITEMS } from 'utils/constants';
import { accentColor } from 'utils/styles';


export default class Timeline extends Component {

  renderHeader() {
    const { selectedFilter, changeFilter } = this.props;

    return (
      <div className='test--timeline-header' style={ headerWrapperStyle }>
        <div style={ rankHeaderStyle }>RANK</div>
        <div style={ unitHeaderStyle }>UNIT</div>
        <div style={ showingContentHeaderStyle }>
          <div style={ showingTextStyle }>SHOWING</div>
          <Select
            name='form-field-name'
            value={ selectedFilter }
            options={
              values(NEW_TIMELINE_FILTERS).map((filter) => ({
                value: filter,
                label: filter
              }))
            }
            clearable={ false }
            searchable={ false }
            menuContainerStyle={ { color: accentColor } }
            wrapperStyle={ filterWrapperStyle }
            onChange={ (newOption) => changeFilter(newOption.value) }
            autosize={ true }
            arrowRenderer={ null }
          />
        </div>
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
              return <Item item={ item } key={ item.key } hasBorderBottom={ false } />;
            }

            const nextItem = nth(items, index + 1);

            if ( !nextItem || includes([NEW_TIMELINE_ITEMS.UNIT_CHANGE, NEW_TIMELINE_ITEMS.JOINED], nextItem.kind)) {
              return <Item item={ item } key={ item.key } hasBorderBottom={ false } />;
            } else {
              return <Item item={ item } key={ item.key } hasBorderBottom={ true } />;
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
  changeFilter: PropTypes.func,
  selectedFilter: PropTypes.string,
};

Timeline.defaultProps = {
  items: [],
};
