import React, { Component, PropTypes } from 'react';
import { get, kebabCase } from 'lodash';
import cx from 'classnames';

import Cr from './showings/cr';
import Trr from './showings/trr';
import Award from './showings/award';
import UnitChange from './showings/unit-change';
import RankChange from './showings/rank-change';
import Joined from './showings/joined';
import Year from './showings/year';
import Empty from './showings/empty';
import { NEW_TIMELINE_ITEMS } from 'utils/constants';
import styles from './item.sass';


export default class Item extends Component {
  constructor(props) {
    super(props);
    this.renderChange = this.renderChange.bind(this);

    const { item } = props;

    const componentInfoMap = {
      [NEW_TIMELINE_ITEMS.CR]: {
        height: 58,
        component: <Cr { ...this.props }/>
      },
      [NEW_TIMELINE_ITEMS.FORCE]: {
        height: 58,
        component: <Trr { ...this.props }/>
      },
      [NEW_TIMELINE_ITEMS.AWARD]: {
        height: 58,
        component: <Award { ...this.props }/>
      },
      [NEW_TIMELINE_ITEMS.UNIT_CHANGE]: {
        height: 24,
        className: 'timeline-special-item',
        component: <UnitChange { ...this.props }/>
      },
      [NEW_TIMELINE_ITEMS.RANK_CHANGE]: {
        height: 24,
        className: 'timeline-special-item',
        component: <RankChange { ...this.props }/>
      },
      [NEW_TIMELINE_ITEMS.JOINED]: {
        height: 24,
        className: 'timeline-special-item',
        component: <Joined { ...this.props }/>
      },
      [NEW_TIMELINE_ITEMS.YEAR]: {
        className: item.hasData ? 'has-data' : '',
        height: item.hasData ? 64 : 32,
        component: <Year { ...this.props }/>
      },
      [NEW_TIMELINE_ITEMS.EMPTY]: {
        height: 32,
        component: <Empty { ...this.props }/>
      },
    };

    this.componentInfo = get(componentInfoMap, item.kind, {});
  }

  renderChange(changeKind, current, display, text, isAfterChange) {
    const { kind } = this.props.item;
    const isChangeItem = kind === changeKind;

    return (
      <span className={
        cx(
          `${kebabCase(changeKind)}-content`,
          { 'changed-item': isChangeItem, 'after-changed-item': isAfterChange }
        )
      }>
        {
          isChangeItem ?
            text :
            <div className={ cx('item-text', { 'current': current }) }>
              { display }
            </div>
        }
      </span>
    );
  }

  render() {
    const { className, component } = this.componentInfo;
    const {
      isCurrentUnit,
      isCurrentRank,
      kind,
      rank,
      unitName,
      isAfterRankChange,
      isAfterUnitChange,
    } = this.props.item;

    return (
      <div
        className={
          cx(
            styles.item,
            className,
            'timeline-item',
            `timeline-${kebabCase(kind)}-item`
          )
        }
      >
        { this.renderChange(
          NEW_TIMELINE_ITEMS.RANK_CHANGE, isCurrentRank, rank, 'RANK CHANGE', isAfterRankChange
        ) }
        { this.renderChange(
          NEW_TIMELINE_ITEMS.UNIT_CHANGE, isCurrentUnit, unitName, 'UNIT CHANGE', isAfterUnitChange
        ) }
        { component }
      </div>
    );
  }

}

Item.propTypes = {
  item: PropTypes.object,
  officerId: PropTypes.number,
  pathname: PropTypes.string,
};
