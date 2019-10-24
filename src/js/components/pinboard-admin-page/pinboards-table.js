import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

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
  render() {
    const { rows, hasMore, nextParams, fetchPinboards } = this.props;
    return (
      <div className={ responsiveContainerStyles.responsiveContainer }>
        <div className={ styles.table }>
          <PinboardRow isHeader={ true } id='ID' title='Pinboard' pinnedCount='Pinned items' createdAt='Date'/>
          <InfiniteScroll
            className={ styles.rowsWrapper }
            loadMore={ () => hasMore ? fetchPinboards(nextParams) : null }
            initialLoad={ true }
            hasMore={ hasMore }
            useWindow={ true }>
            {
              _.map(rows, row => {
                const Element = rowMap[row.kind];
                return <Element key={ row.id } { ...row }/>;
              })
            }
          </InfiniteScroll>
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
};

PinboardsTable.defaultProps = {
  rows: [],
};

PinboardsTable.contextTypes = {
  editModeOn: PropTypes.bool,
};
