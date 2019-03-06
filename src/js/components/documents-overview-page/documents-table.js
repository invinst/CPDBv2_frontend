import React, { Component, PropTypes, createElement } from 'react';
import * as _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import DocumentRow from './document-row';
import MonthSeparator from './month-separator';
import * as constants from 'utils/constants';
import styles from './documents-table.sass';

const rowMap = {
  [constants.DOCUMENTS_SEARCH_ITEMS.DOCUMENT]: DocumentRow,
  [constants.DOCUMENTS_SEARCH_ITEMS.MONTH_SEPARATOR]: MonthSeparator
};

export default class DocumentsTable extends Component {
  shouldComponentUpdate(nextProps) {
    const { hasMore, nextParams, rows } = this.props;
    return (
      hasMore !== nextProps.hasMore ||
      !_.isEqual(nextParams, nextProps.nextParams) ||
      !_.isEqual(_.map(rows, 'id'), _.map(nextProps.rows, 'id'))
    );
  }

  render() {
    const { rows, hasMore, nextParams, fetchDocuments, onCRLinkClick } = this.props;
    return (
      <div className={ responsiveContainerStyles.responsiveContainer }>
        <div className={ styles.table }>
          <div className={ styles.headerRow }>
            <span className='header-thumbnail'/>
            <span className='header-title'>Document</span>
            <span className='header-crid-uid'>CRID / UID</span>
            <span className='header-source'>Source</span>
            <span className='header-counts'>Views/Downloads</span>
            <span className='header-date'>Date</span>
          </div>
          <div className={ styles.rowsWrapper }>
            <InfiniteScroll
              loadMore={ () => hasMore ? fetchDocuments(nextParams) : null }
              initialLoad={ false }
              hasMore={ hasMore }
              useWindow={ true }>
              {
                _.map(rows, row => createElement(
                  rowMap[row.kind],
                  { ...row, key: row.id, onCRLinkClick: onCRLinkClick }))
              }
            </InfiniteScroll>
          </div>
        </div>
      </div>
    );
  }
}

DocumentsTable.propTypes = {
  rows: PropTypes.array,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  fetchDocuments: PropTypes.func,
  onCRLinkClick: PropTypes.func
};

DocumentsTable.defaultProps = {
  rows: []
};
