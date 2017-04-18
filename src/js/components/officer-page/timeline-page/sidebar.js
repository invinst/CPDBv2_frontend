import React, { Component, PropTypes } from 'react';

import Minimap from './minimap';
import { leftButtonStyle, rightButtonStyle, wrapperStyle } from './sidebar.style';


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
    const { toggleSortOrder, minimap } = this.props;
    return (
      <div style={ wrapperStyle }>
        <div>
          <span style={ leftButtonStyle }>Filter</span>
          <span style={ rightButtonStyle } onClick={ toggleSortOrder }>{ this.rightButtonText() }</span>
        </div>
        <Minimap minimap={ minimap }/>
      </div>
    );
  }
}

SideBar.propTypes = {
  fetchMinimap: PropTypes.func,
  sortDescending: PropTypes.bool,
  toggleSortOrder: PropTypes.func,
  officerId: PropTypes.number,
  minimap: PropTypes.array
};
