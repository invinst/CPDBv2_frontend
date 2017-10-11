import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Minimap from './minimap';
import SideBarButton from './sidebar-button';
import { imgUrl } from 'utils/static-assets';
import { forEach, omit } from 'lodash';

import { serializeFilterParams } from 'utils/location';

import {
  wrapperStyle,
  leftButtonStyle,
  rightButtonStyle,
  headingStyle,
  filterBlockStyle,
  xContainerStyle,
  xStyle,
  filterTitleStyle,
  filterTypeStyle,
  clearFilterTextStyle,
  clearFilterLinkStyle
} from './sidebar.style';


export default class SideBar extends Component {
  rightButtonText() {
    const { sortDescending } = this.props;
    if (sortDescending) {
      return 'Sort by oldest first';
    } else {
      return 'Sort by newest first';
    }
  }

  render() {
    const {
      flipSortOrder,
      minimap,
      selectMinimapItem,
      sortDescending,
      hoverMinimapItem,
      hoveredItemIndex,
      selectedItemIndex,
      filters,
      pathname
    } = this.props;

    let filterList = [];
    forEach(filters, (value, key) => {
      const linkPath = pathname + serializeFilterParams(omit(filters, key), '?');
      filterList.push(
        <div className='test--filter-block' key={ 'filter-' + key + '-' + value } style={ filterBlockStyle }>
          <Link className='test--clear-filter-link' to={ linkPath } style={ xContainerStyle }>
            <img src={ imgUrl('ic-close.svg') } style={ xStyle }/>
          </Link>
          <p style={ filterTitleStyle }>{ value }</p>
          <p style={ filterTypeStyle }>Complaints</p>
        </div>
      );
    });

    return (
      <div style={ wrapperStyle }>
        <div>
          <SideBarButton
            className='test--filter-button'
            style={ { ...leftButtonStyle, display: 'none' } }
          >
            Filter
          </SideBarButton>

          <SideBarButton
            className='test--sort-button'
            style={ { ...rightButtonStyle, display: 'none' } }
            onClick={ flipSortOrder }
          >
            { this.rightButtonText() }
          </SideBarButton>

        </div>
        { Object.keys(filters).length > 0 && (
          <div>
            <span style={ headingStyle }>Filtered by</span>
            { filterList }
          </div>
        ) }

        <Minimap minimap={ minimap } onItemClick={ selectMinimapItem } sortDescending={ sortDescending }
          onItemHover={ hoverMinimapItem } hoveredItemIndex={ hoveredItemIndex }
          selectedItemIndex={ selectedItemIndex }/>

        { Object.keys(filters).length > 0 && (
          <div style={ clearFilterTextStyle }>
            This timeline is being filtered.&nbsp;
            <Link to={ pathname } style={ clearFilterLinkStyle }>Clear filters</Link>
          </div>
        ) }
      </div>
    );
  }
}

SideBar.propTypes = {
  sortDescending: PropTypes.bool,
  flipSortOrder: PropTypes.func,
  officerId: PropTypes.number,
  minimap: PropTypes.array,
  selectMinimapItem: PropTypes.func,
  hoverMinimapItem: PropTypes.func,
  hoveredItemIndex: PropTypes.number,
  selectedItemIndex: PropTypes.number,
  filters: PropTypes.object,
  pathname: PropTypes.string
};

SideBar.defaultProps = {
  filters: {},
  pathname: ''
};
