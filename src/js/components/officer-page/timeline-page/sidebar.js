import React, { Component, PropTypes } from 'react';

import Minimap from './minimap';
import SideBarButton from './sidebar-button';

import { wrapperStyle, leftButtonStyle, rightButtonStyle } from './sidebar.style';


export default class SideBar extends Component {
  componentDidMount() {
    const { fetchMinimap, officerId } = this.props;
    fetchMinimap(officerId);
  }

  rightButtonText() {
    const { sortDescending } = this.props;
    if (sortDescending) {
      return 'Sort by oldest first';
    } else {
      return 'Sort by newest first';
    }
  }

  render() {
    const { flipSortOrder, minimap, selectMinimapItem, sortDescending } = this.props;
    return (
      <div style={ wrapperStyle }>
        <div>
          <SideBarButton style={ leftButtonStyle }>Filter</SideBarButton>
          <SideBarButton style={ rightButtonStyle } onClick={ () => flipSortOrder() }>
            { this.rightButtonText() }
          </SideBarButton>
        </div>
        <Minimap minimap={ minimap } onItemClick={ selectMinimapItem } sortDescending={ sortDescending }/>
      </div>
    );
  }
}

SideBar.propTypes = {
  fetchMinimap: PropTypes.func,
  sortDescending: PropTypes.bool,
  flipSortOrder: PropTypes.func,
  officerId: PropTypes.number,
  minimap: PropTypes.array,
  selectMinimapItem: PropTypes.func
};
