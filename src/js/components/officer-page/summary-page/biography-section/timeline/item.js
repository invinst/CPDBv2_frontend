import React, { Component, PropTypes } from 'react';

import { get } from 'lodash';
import CRItem from './cr-item';
import TRRItem from './trr-item';
import AwardItem from './award-item';
import UnitChangeItem from './unit-change-item';
import JoinedItem from './joined-item';
import YearItem from './year-item';


export default class Item extends Component {
  render() {
    const componentMap = {
      'CR': <CRItem { ...this.props }/>,
      'FORCE': <TRRItem { ...this.props } />,
      'AWARD': <AwardItem { ...this.props } />,
      'UNIT_CHANGE': <UnitChangeItem { ...this.props } />,
      'JOINED': <JoinedItem { ...this.props } />,
      'YEAR': <YearItem { ...this.props } />,
    };
    return get(componentMap, this.props.item.kind, null);
  }
}

Item.propTypes = {
  item: PropTypes.object,
};
