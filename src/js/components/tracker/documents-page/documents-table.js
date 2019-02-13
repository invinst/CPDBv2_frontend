import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import styles from './documents-table.sass';
import Counter from './counter.js';

export default class DocumentsTable extends Component {
  handleClick(id) {
  }

  render() {
    const { rows, nextParams, hasMore, fetchTrackerDocuments } = this.props;

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
            loadMore={ () => fetchTrackerDocuments({ ...nextParams }) }
            initialLoad={ false }
            hasMore={ hasMore }
            useWindow={ true }>
            {
              map(rows, row => (
                <div
                  key={ row.id }
                  onClick={ this.handleClick.bind(this, row.id) }
                  className={ styles.row }>
                  <span
                    className='document-thumbnail'
                    style={ row.thumbnail !== null ? {
                      backgroundImage: `url(${row.thumbnail})`
                    } : null }/>
                  <span className='document-title'>{ row.title }</span>
                  <span className='document-source'>{ row.source }</span>
                  <Counter
                    className='document-counts'
                    viewsCount={ row.viewsCount }
                    downloadsCount={ row.downloadsCount } />
                  <span className='document-date'>{ row.date }</span>
                  <span className='document-toggle'/>
                </div>
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
  fetchTrackerDocuments: PropTypes.func
};
