import React, { Component, PropTypes } from 'react';

import styles from './crawler-row.sass';
import cx from 'classnames';

export default class CrawlerRow extends Component {
  render() {
    const { crawlerName, status, recentRunAt, numNewDocuments, numDocuments, numSuccessfulRun } = this.props;
    return (
      <div className={ styles.crawlerRow }>
        <span className='crawler-col crawler-name'>{ crawlerName }</span>
        <span className={ cx('crawler-col recent-run', { failed: status == 'Failed' }) }>{ recentRunAt }</span>
        <span className='crawler-col num-new-documents'>{ numNewDocuments }</span>
        <span className='crawler-col num-documents' >{ numDocuments }</span>
        <span className='crawler-col' >{ numSuccessfulRun }</span>
      </div>
    );
  }
}

CrawlerRow.propTypes = {
  crawlerName: PropTypes.string,
  status: PropTypes.string,
  recentRunAt: PropTypes.string,
  numDocuments: PropTypes.number,
  numNewDocuments: PropTypes.number,
  numSuccessfulRun: PropTypes.number,
};
