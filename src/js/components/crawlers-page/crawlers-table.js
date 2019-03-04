import React, { Component, PropTypes } from 'react';
import { map, isEmpty } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import CrawlerRow from './crawler-row';
import styles from './crawlers-table.sass';

export default class CrawlersTable extends Component {
  render() {
    const { rows, requestCrawlers, nextParams } = this.props;
    return (
      <div className={ responsiveContainerStyles.responsiveContainer }>
        <div className={ styles.table }>
          <div className={ styles.headerRow }>
            <span className='header-col crawler-header'>Crawler</span>
            <span className='header-col'>Recent Run</span>
            <span className='header-col'>New Documents</span>
            <span className='header-col'>Total Documents</span>
            <span className='header-col'>Successful Runs</span>
          </div>
          <InfiniteScroll
            loadMore={ () => requestCrawlers(nextParams) }
            initialLoad={ false }
            hasMore={ !isEmpty(nextParams) }
            useWindow={ true }>
            {
              map(rows, row => (
                <CrawlerRow { ...row } key={ row.id }/>
              ))
            }
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

CrawlersTable.propTypes = {
  rows: PropTypes.array,
  requestCrawlers: PropTypes.func,
  nextParams: PropTypes.object
};
