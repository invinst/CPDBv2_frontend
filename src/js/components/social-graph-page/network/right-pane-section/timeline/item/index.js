import React, { Component, PropTypes } from 'react';

import Cr from './cr';
import Year from './year';
import { NEW_TIMELINE_ITEMS } from 'utils/constants';


export default class Item extends Component {
  render() {
    const { item } = this.props;

    const componentMap = {
      [NEW_TIMELINE_ITEMS.CR]: Cr,
      [NEW_TIMELINE_ITEMS.YEAR]: Year
    };
    const ItemComponent = componentMap[item.kind];
    return <ItemComponent { ...this.props }/>;
  }
}

Item.propTypes = {
  item: PropTypes.object,
  pathname: PropTypes.string,
};
