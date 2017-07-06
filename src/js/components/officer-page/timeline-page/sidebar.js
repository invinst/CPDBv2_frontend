import React, { Component, PropTypes } from 'react';

import Minimap from './minimap';
import SideBarButton from './sidebar-button';

import { wrapperStyle, leftButtonStyle, rightButtonStyle } from './sidebar.style';


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
      flipSortOrder, minimap, selectMinimapItem, sortDescending, hoverMinimapItem, hoveredItemIndex
    } = this.props;
    return (
      <div style={ wrapperStyle }>
        <div>
          <SideBarButton className='test--filter-button' style={ leftButtonStyle }>Filter</SideBarButton>
          <SideBarButton className='test--sort-button' style={ rightButtonStyle } onClick={ () => flipSortOrder() }>
            { this.rightButtonText() }
          </SideBarButton>
        </div>
        <Minimap minimap={ minimap } onItemClick={ selectMinimapItem } sortDescending={ sortDescending }
          onItemHover={ hoverMinimapItem } hoveredItemIndex={ hoveredItemIndex }/>
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
  hoveredItemIndex: PropTypes.number
};
