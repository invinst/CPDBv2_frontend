import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import Cr from './showings/cr';
import Trr from './showings/trr';
import Award from './showings/award';
import UnitChange from './showings/unit-change';
import Joined from './showings/joined';
import Year from './showings/year';
import Empty from './showings/empty';
import { NEW_TIMELINE_ITEMS } from 'utils/constants';
import * as baseStyles from './item.style';


export default class Item extends Component {

  constructor(props) {
    super(props);
    this.renderRankAndUnit = this.renderRankAndUnit.bind(this);

    const { item } = props;

    const componentMap = {
      [NEW_TIMELINE_ITEMS.CR]: {
        height: 58,
        className: 'test--timeline-cr-item',
        item: <Cr { ...this.props } baseStyles={ baseStyles }/>
      },
      [NEW_TIMELINE_ITEMS.FORCE]: {
        height: 58,
        className: 'test--timeline-trr-item',
        item: <Trr { ...this.props } baseStyles={ baseStyles }/>
      },
      [NEW_TIMELINE_ITEMS.AWARD]: {
        height: 58,
        className: 'test--timeline-award-item',
        item: <Award { ...this.props } baseStyles={ baseStyles }/>
      },
      [NEW_TIMELINE_ITEMS.UNIT_CHANGE]: {
        height: 24,
        className: 'test--timeline-unit-change-item',
        item: <UnitChange { ...this.props } baseStyles={ baseStyles }/>
      },
      [NEW_TIMELINE_ITEMS.JOINED]: {
        height: 24,
        className: 'test--timeline-joined-item',
        item: <Joined { ...this.props } baseStyles={ baseStyles }/>
      },
      [NEW_TIMELINE_ITEMS.YEAR]: {
        height: item.hasData ? 64 : 32,
        className: 'test--timeline-year-item',
        item: <Year { ...this.props } baseStyles={ baseStyles }/>
      },
      [NEW_TIMELINE_ITEMS.EMPTY]: {
        height: 32,
        className: 'test--timeline-empty-item',
        item: <Empty { ...this.props } baseStyles={ baseStyles }/>
      },
    };

    this.component = get(componentMap, item.kind, {});
  }

  renderRankAndUnit() {
    const {
      isFirstRank, isLastRank, isFirstUnit, isLastUnit, rankDisplay, unitDisplay, kind, isCurrentUnit
    } = this.props.item;
    const height = this.component.height;
    const { baseRankStyle, baseUnitStyle, unitChangeStyle, unitTextStyle, rankTextStyle } = baseStyles;

    return (
      <span>
        <span
          style={ baseRankStyle(height, isFirstRank, isLastRank) }
          className='test--item-rank'
        >
          <div style={ rankTextStyle }>
            { rankDisplay }
          </div>
        </span>
        {
          kind === NEW_TIMELINE_ITEMS.UNIT_CHANGE ? (
            <span
              style={ unitChangeStyle(height, isFirstUnit, isLastUnit) }
              className='test--unit-change-item-unit'
            >
              UNIT CHANGE
            </span>
          ) : (
            <span
              style={ baseUnitStyle(height, isFirstUnit, isLastUnit) }
              className='test--item-unit'
            >
              <div style={ unitTextStyle(unitDisplay === 'Unassigned', isCurrentUnit) }>
                { (isFirstUnit && unitDisplay) ? unitDisplay : ' ' }
              </div>
            </span>
          )
        }
      </span>
    );
  }

  render() {
    const { height, className, item } = this.component;
    return (
      <div style={ baseStyles.baseWrapperStyle(height) } className={ className }>
        { this.renderRankAndUnit() }
        { item }
      </div>
    );
  }

}

Item.propTypes = {
  item: PropTypes.object,
  officerId: PropTypes.number,
  openComplaintPage: PropTypes.func,
};
