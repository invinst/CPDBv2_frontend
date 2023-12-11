import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { get, kebabCase } from 'lodash';
import cx from 'classnames';

import Cr from './showings/cr';
import Lawsuit from './showings/lawsuit';
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
  componentInfo() {
    const { item } = this.props;

    const componentInfoMap = {
      [NEW_TIMELINE_ITEMS.CR]: {
        component: <Cr { ...this.props }/>,
      },
      [NEW_TIMELINE_ITEMS.LAWSUIT]: {
        component: <Lawsuit { ...this.props }/>,
      },
      [NEW_TIMELINE_ITEMS.FORCE]: {
        component: <Trr { ...this.props }/>,
      },
      [NEW_TIMELINE_ITEMS.AWARD]: {
        component: <Award { ...this.props }/>,
      },
      [NEW_TIMELINE_ITEMS.UNIT_CHANGE]: {
        className: 'timeline-special-item',
        component: <UnitChange { ...this.props }/>,
      },
      [NEW_TIMELINE_ITEMS.RANK_CHANGE]: {
        className: 'timeline-special-item',
        component: <RankChange { ...this.props }/>,
      },
      [NEW_TIMELINE_ITEMS.JOINED]: {
        className: 'timeline-special-item',
        component: <Joined { ...this.props }/>,
      },
      [NEW_TIMELINE_ITEMS.YEAR]: {
        className: item.hasData ? 'has-data' : '',
        component: <Year { ...this.props }/>,
      },
      [NEW_TIMELINE_ITEMS.EMPTY]: {
        className: 'no-print',
        component: <Empty { ...this.props }/>,
      },
    };

    return get(componentInfoMap, item.kind, {});
  }

  renderChange = (changeKind, current, display, text, isAfterChange) => {
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
  };

  render() {
    const { className, component } = this.componentInfo();
    const {
      isCurrentUnit,
      isCurrentRank,
      kind,
      rank,
      unitName,
      isAfterRankChange,
      isAfterUnitChange,
      hasFirstChangedItem,
    } = this.props.item;

    return (
      <div
        className={
          cx(
            styles.item,
            className,
            'timeline-item',
            `timeline-${kebabCase(kind)}-item`,
            { 'has-first-changed-item': hasFirstChangedItem }
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
