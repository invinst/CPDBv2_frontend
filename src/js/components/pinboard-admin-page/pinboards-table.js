import PropTypes from 'prop-types';
import React from 'react';
import { map } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import PinboardRow from './pinboard-row';
import MonthSeparator from 'components/common/table/month-separator';
import { PINBOARDS_SEARCH_ITEMS } from 'utils/constants';
import styles from './pinboards-table.sass';

const rowMap = {
  [PINBOARDS_SEARCH_ITEMS.PINBOARD]: PinboardRow,
  [PINBOARDS_SEARCH_ITEMS.MONTH_SEPARATOR]: MonthSeparator,
};

export default function PinboardsTable(props) {
  const { rows, hasMore, nextParams, fetchPinboards, isLoading, focusItem } = props;
  return (
    <div className={ responsiveContainerStyles.responsiveContainer }>
      <div className={ styles.table }>
        <PinboardRow
          isHeader={ true }
          id='ID'
          title='Pinboard'
          pinnedCount='Pinned items'
          childCount='Children'
          createdAt='Date'
        />
        <InfiniteScroll
          className={ styles.rowsWrapper }
          loadMore={ () => hasMore ? fetchPinboards(nextParams) : null }
          hasMore={ !isLoading && hasMore }
          useWindow={ true }>
          {
            map(rows, row => {
              const Element = rowMap[row.kind];
              return <Element key={ row.id } onClick={ () => focusItem(row) } { ...row }/>;
            })
          }
        </InfiniteScroll>
      </div>
    </div>
  );
}

PinboardsTable.propTypes = {
  rows: PropTypes.array,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  fetchPinboards: PropTypes.func,
  isLoading: PropTypes.bool,
  focusItem: PropTypes.func,
};

PinboardsTable.defaultProps = {
  rows: [],
  isLoading: false,
};
