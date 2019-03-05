import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash';

import styles from './crawler-row.sass';

export default class CrawlerRow extends Component {
  render() {
    const { crawlerName, status, recentRunAt, numNewDocuments, numDocuments, numSuccessfulRun, logUrl } = this.props;
    return (
      <a className={ cx(styles.crawlerRow, { 'no-log-file': isEmpty(logUrl) }) } href={ logUrl } target='_blank'>
        <span className='crawler-col crawler-name'>{ crawlerName }</span>
        <span className={ cx('crawler-col recent-run', { failed: status == 'Failed' }) }>{ recentRunAt }</span>
        <span className='crawler-col num-new-documents'>{ numNewDocuments }</span>
        <span className='crawler-col num-documents' >{ numDocuments }</span>
        <span className='crawler-col num-successful-runs' >{ numSuccessfulRun }</span>
      </a>
    );
  }
}

CrawlerRow.propTypes = {
  crawlerName: PropTypes.string,
  status: PropTypes.string,
  recentRunAt: PropTypes.string,
  logUrl: PropTypes.string,
  numDocuments: PropTypes.number,
  numNewDocuments: PropTypes.number,
  numSuccessfulRun: PropTypes.number,
};
