import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import cx from 'classnames';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import DocumentRow from './document-row';
import MonthSeparator from 'components/common/table/month-separator';
import * as constants from 'utils/constants';
import styles from './documents-table.sass';
import { EditModeContext } from 'contexts';
import LoadingSpinner from 'components/common/loading-spinner';


const rowMap = {
  [constants.DOCUMENTS_SEARCH_ITEMS.DOCUMENT]: DocumentRow,
  [constants.DOCUMENTS_SEARCH_ITEMS.MONTH_SEPARATOR]: MonthSeparator,
};

export default class DocumentsTable extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { hasMore, nextParams, rows, isRequesting } = this.props;
    const { editModeOn } = this.context;
    return (
      hasMore !== nextProps.hasMore ||
      editModeOn !== nextContext.editModeOn ||
      !_.isEqual(nextParams, nextProps.nextParams) ||
      !_.isEqual(_.map(rows, 'id'), _.map(nextProps.rows, 'id')) ||
      isRequesting !== nextProps.isRequesting
    );
  }

  render() {
    const {
      rows,
      hasMore,
      nextParams,
      fetchDocuments,
      fetchDocumentsAuthenticated,
      onCRLinkClick,
      isRequesting,
    } = this.props;
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
            {
              isRequesting && <LoadingSpinner className='documents-loading-spinner' />
            }
          </div>
        </div>
      </div>
    );
  }
}

DocumentsTable.contextType = EditModeContext;

DocumentsTable.propTypes = {
  rows: PropTypes.array,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  fetchDocuments: PropTypes.func,
  fetchDocumentsAuthenticated: PropTypes.func,
  onCRLinkClick: PropTypes.func,
  isRequesting: PropTypes.bool,
};

DocumentsTable.defaultProps = {
  rows: [],
  isRequesting: false,
};
