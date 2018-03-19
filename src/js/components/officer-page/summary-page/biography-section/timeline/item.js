import React from 'react';

import { get } from 'lodash';
import CRItem from './cr-item';
import TRRItem from './trr-item';
import AwardItem from './award-item';
import UnitChangeItem from './unit-change-item';
import JointItem from './join-item';
import YearItem from './year-item';


const Item = function (props) {
  const item = props.item;
  const componentMap = {
    'CR': <CRItem item={ item } />,
    'FORCE': <TRRItem item={ item } />,
    'AWARD': <AwardItem item={ item } />,
    'UNIT_CHANGE': <UnitChangeItem item={ item } />,
    'JOINED': <JointItem item={ item } />,
    'YEAR': <YearItem item={ item } />,
  };
  return get(componentMap, item.kind, null);
};

export default Item;
