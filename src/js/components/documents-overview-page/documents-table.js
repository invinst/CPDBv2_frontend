import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import cx from 'classnames';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import DocumentRow from './document-row';
import MonthSeparator from 'components/common/table/month-separator';
import * as constants from 'utils/constants';
import styles from './documents-table.sass';

const rowMap = {
  [constants.DOCUMENTS_SEARCH_ITEMS.DOCUMENT]: DocumentRow,
  [constants.DOCUMENTS_SEARCH_ITEMS.MONTH_SEPARATOR]: MonthSeparator,
};

export default class DocumentsTable extends Component {
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
    const { rows, hasMore, nextParams, fetchDocuments, fetchDocumentsAuthenticated, onCRLinkClick } = this.props;
    const { editModeOn } = this.context;
    const fetch = editModeOn ? fetchDocumentsAuthenticated : fetchDocuments;
    return (
      <div className={ responsiveContainerStyles.responsiveContainer }>
        <div className={ styles.table }>
          <div className={ cx(styles.headerRow, { 'edit-mode': editModeOn }) }>
            <span className='header-thumbnail'/>
            <span className='header-title'>Document</span>
            <span className='header-crid-uid'>CRID / UID</span>
            <span className='header-source'>Source</span>
            <span className='header-counts'>Views/Downloads</span>
            <span className='header-date'>Date</span>
          </div>
          <div className={ styles.rowsWrapper }>
            <InfiniteScroll
              loadMore={ () => hasMore ? fetch(nextParams) : null }
              initialLoad={ false }
              hasMore={ hasMore }
              useWindow={ true }>
              {
                _.map(rows, row => {
                  const Element = rowMap[row.kind];
                  return <Element key={ row.id } onCRLinkClick={ onCRLinkClick } { ...row } editModeOn={ editModeOn }/>;
                })
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
  fetchDocumentsAuthenticated: PropTypes.func,
  onCRLinkClick: PropTypes.func,
};

DocumentsTable.defaultProps = {
  rows: [],
};

DocumentsTable.contextTypes = {
  editModeOn: PropTypes.bool,
};
