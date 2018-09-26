import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import Cr from './showings/cr';
import Trr from './showings/trr';
import Award from './showings/award';
import UnitChange from './showings/unit-change';
import RankChange from './showings/rank-change';
import Joined from './showings/joined';
import Year from './showings/year';
import Empty from './showings/empty';
import { NEW_TIMELINE_ITEMS } from 'utils/constants';
import * as baseStyles from './baseItem.style';
import { rankStyle, unitStyle, wrapperStyle, changeStyle, textStyle } from './item.style';


export default class Item extends Component {

  constructor(props) {
    super(props);
    this.renderChange = this.renderChange.bind(this);

    const { item } = props;

    const componentInfoMap = {
      [NEW_TIMELINE_ITEMS.CR]: {
        height: 58,
        className: 'test--timeline-cr-item',
        component: <Cr { ...this.props } baseStyles={ baseStyles }/>
      },
      [NEW_TIMELINE_ITEMS.FORCE]: {
        height: 58,
        className: 'test--timeline-trr-item',
        component: <Trr { ...this.props } baseStyles={ baseStyles }/>
      },
      [NEW_TIMELINE_ITEMS.AWARD]: {
        height: 58,
        className: 'test--timeline-award-item',
        component: <Award { ...this.props } baseStyles={ baseStyles }/>
      },
      [NEW_TIMELINE_ITEMS.UNIT_CHANGE]: {
        height: 24,
        className: 'test--timeline-unit-change-item',
        component: <UnitChange { ...this.props } baseStyles={ baseStyles }/>
      },
      [NEW_TIMELINE_ITEMS.RANK_CHANGE]: {
        height: 24,
        className: 'test--timeline-rank-change-item',
        component: <RankChange { ...this.props } baseStyles={ baseStyles }/>
      },
      [NEW_TIMELINE_ITEMS.JOINED]: {
        height: 24,
        className: 'test--timeline-joined-item',
        component: <Joined { ...this.props } baseStyles={ baseStyles }/>
      },
      [NEW_TIMELINE_ITEMS.YEAR]: {
        height: item.hasData ? 64 : 32,
        className: 'test--timeline-year-item',
        component: <Year { ...this.props } baseStyles={ baseStyles }/>
      },
      [NEW_TIMELINE_ITEMS.EMPTY]: {
        height: 32,
        className: 'test--timeline-empty-item',
        component: <Empty { ...this.props } baseStyles={ baseStyles }/>
      },
    };

    this.componentInfo = get(componentInfoMap, item.kind, {});
  }

  renderChange(changeKind, kindStyle, first, last, current, display, text) {
    const {
      kind,
      isFirstMutual,
      isMutual,
    } = this.props.item;
    const height = this.componentInfo.height;
    return (
      <span>
        {
          isFirstMutual || kind === changeKind && !isMutual ? (
            <span
              style={ changeStyle(height, first, last) }
              className='test--item-change'
            >
              { text }
            </span>
          ) : isMutual && !isFirstMutual ? (
            <span
              style={ changeStyle(height, first, last) }
              className='test--item-change'
            />
          ) : (
            <span
              style={ kindStyle(height, first, last) }
              className='test--item-rank-unit'
            >
              <div style={ textStyle(display === 'Unassigned', current) }>
                { display }
              </div>
            </span>
          )
        }
      </span>
    );
  }

  render() {
    const { height, className, component } = this.componentInfo;
    const {
      isFirstRank,
      isLastRank,
      isFirstUnit,
      isLastUnit,
      rankDisplay,
      unitDisplay,
      isCurrentUnit,
      isCurrentRank,
    } = this.props.item;

    return (
      <div style={ wrapperStyle(height) } className={ className }>
        { this.renderChange(
          NEW_TIMELINE_ITEMS.RANK_CHANGE, rankStyle, isFirstRank, isLastRank, isCurrentRank, rankDisplay, 'RANK CHANGE'
        ) }
        { this.renderChange(
          NEW_TIMELINE_ITEMS.UNIT_CHANGE, unitStyle, isFirstUnit, isLastUnit, isCurrentUnit, unitDisplay, 'UNIT CHANGE'
        ) }
        { component }
      </div>
    );
  }

}

Item.propTypes = {
  item: PropTypes.object,
  officerId: PropTypes.number,
  openComplaintPage: PropTypes.func,
  pathname: PropTypes.string,
};
