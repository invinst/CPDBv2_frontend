import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import cx from 'classnames';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import PinboardRow from './pinboard-row';
import MonthSeparator from './month-separator';
import { PINBOARDS_SEARCH_ITEMS } from 'utils/constants';
import styles from 'components/pinboard-admin-page/pinboards-table.sass';

const rowMap = {
  [PINBOARDS_SEARCH_ITEMS.PINBOARD]: PinboardRow,
  [PINBOARDS_SEARCH_ITEMS.MONTH_SEPARATOR]: MonthSeparator,
};

export default class PinboardsTable extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { hasMore, nextParams, rows } = this.props;
    const { editModeOn } = this.context;
    return (
      hasMore !== nextProps.hasMore ||
      editModeOn !== nextContext.editModeOn ||
      !_.isEqual(nextParams, nextProps.nextParams) ||
      !_.isEqual(_.map(rows, 'id'), _.map(nextProps.rows, 'id'))
    );
  }

  render() {
    const { rows, hasMore, nextParams, fetchPinboards } = this.props;
    const { editModeOn } = this.context;
    return (
      <div className={ responsiveContainerStyles.responsiveContainer }>
        <div className={ styles.table }>
          <div className={ cx(styles.headerRow, { 'edit-mode': editModeOn }) }>
            <span className='header-thumbnail'/>
            <span className='header-id'>ID</span>
            <span className='header-title'>Pinboard</span>
            <span className='header-pinned'>Pinned items</span>
            <span className='header-date'>Date</span>
          </div>
          <div className={ styles.rowsWrapper }>
            <InfiniteScroll
              loadMore={ () => hasMore ? fetchPinboards(nextParams) : null }
              initialLoad={ true }
              hasMore={ hasMore }
              useWindow={ true }>
              {
                _.map(rows, row => {
                  const Element = rowMap[row.kind];
                  return <Element key={ row.id } { ...row } editModeOn={ editModeOn }/>;
                })
              }
            </InfiniteScroll>
          </div>
        </div>
      </div>
    );
  }
}

PinboardsTable.propTypes = {
  rows: PropTypes.array,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  fetchPinboards: PropTypes.func,
  fetchPinboardsAuthenticated: PropTypes.func,
  onCRLinkClick: PropTypes.func,
};

PinboardsTable.defaultProps = {
  rows: [],
};

PinboardsTable.contextTypes = {
  editModeOn: PropTypes.bool,
};
