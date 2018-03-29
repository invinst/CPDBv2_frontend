import React, { Component, PropTypes } from 'react';

import { get } from 'lodash';
import CRItem from './cr-item';
import TRRItem from './trr-item';
import AwardItem from './award-item';
import UnitChangeItem from './unit-change-item';
import JoinedItem from './joined-item';
import YearItem from './year-item';
import EmptyItem from './empty-item';
import { NEW_TIMELINE_ITEMS } from 'utils/constants';


export default class Item extends Component {
  render() {
    const componentMap = {
      [NEW_TIMELINE_ITEMS.CR]: <CRItem { ...this.props }/>,
      [NEW_TIMELINE_ITEMS.FORCE]: <TRRItem { ...this.props } />,
      [NEW_TIMELINE_ITEMS.AWARD]: <AwardItem { ...this.props } />,
      [NEW_TIMELINE_ITEMS.UNIT_CHANGE]: <UnitChangeItem { ...this.props } />,
      [NEW_TIMELINE_ITEMS.JOINED]: <JoinedItem { ...this.props } />,
      [NEW_TIMELINE_ITEMS.YEAR]: <YearItem { ...this.props } />,
      [NEW_TIMELINE_ITEMS.EMPTY]: <EmptyItem { ...this.props } />,
    };
    return get(componentMap, this.props.item.kind, null);
  }
}

Item.propTypes = {
  item: PropTypes.object,
};
