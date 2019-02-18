import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import DocumentRow from './document-row';
import styles from './documents-table.sass';

export default class DocumentsTable extends Component {
  render() {
    const { rows, hasMore, nextParams, fetchDocumentsByCRID, setDocumentShow } = this.props;

    return (
      <div className={ responsiveContainerStyles.responsiveContainer }>
        <div className={ styles.table }>
          <div className={ styles.headerRow }>
            <span className='header-thumbnail'/>
            <span className='header-title'>Document</span>
            <span className='header-source'>Source</span>
            <span className='header-counts'>Views/Downloads</span>
            <span className='header-date'>Date</span>
            <span className='header-toggle'/>
          </div>
          <InfiniteScroll
            loadMore={ () => fetchDocumentsByCRID({ ...nextParams }) }
            initialLoad={ false }
            hasMore={ hasMore }
            useWindow={ true }>
            {
              map(rows, row => (
                <DocumentRow { ...row } key={ row.id } setDocumentShow={ setDocumentShow }/>
              ))
            }
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

DocumentsTable.propTypes = {
  rows: PropTypes.array,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  setDocumentShow: PropTypes.func,
  fetchDocumentsByCRID: PropTypes.func
};
