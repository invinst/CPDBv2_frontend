import React, { Component, PropTypes } from 'react';

import Cr from './cr';
import Year from './year';
import { NEW_TIMELINE_ITEMS } from 'utils/constants';


export default class Item extends Component {
  constructor(props) {
    super(props);
    const { item } = props;

    const componentMap = {
      [NEW_TIMELINE_ITEMS.CR]: Cr,
      [NEW_TIMELINE_ITEMS.YEAR]: Year
    };
    const ItemComponent = componentMap[item.kind];
    this.component = <ItemComponent { ...this.props }/>;
  }

  render() {
    return this.component;
  }
}

Item.propTypes = {
  item: PropTypes.object,
  pathname: PropTypes.string,
};
