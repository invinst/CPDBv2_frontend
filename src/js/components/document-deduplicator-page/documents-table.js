import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import DocumentRow from './document-row';
import styles from './documents-table.sass';

export default class DocumentsTable extends Component {
  render() {
    const { rows, setDocumentShow } = this.props;

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
          {
            map(rows, row => (
              <DocumentRow { ...row } key={ row.id } setDocumentShow={ setDocumentShow }/>
            ))
          }
        </div>
      </div>
    );
  }
}

DocumentsTable.propTypes = {
  rows: PropTypes.array,
  setDocumentShow: PropTypes.func
};
