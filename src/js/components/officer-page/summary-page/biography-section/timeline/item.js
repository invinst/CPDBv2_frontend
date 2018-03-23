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
    'CR': <CRItem { ...props }/>,
    'FORCE': <TRRItem { ...props } />,
    'AWARD': <AwardItem { ...props } />,
    'UNIT_CHANGE': <UnitChangeItem { ...props } />,
    'JOINED': <JointItem { ...props } />,
    'YEAR': <YearItem { ...props } />,
  };
  return get(componentMap, item.kind, null);
};

export default Item;
