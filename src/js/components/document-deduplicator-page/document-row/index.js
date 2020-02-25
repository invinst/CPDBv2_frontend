import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import browserHistory from 'utils/history';
import Counter from './counter';
import Toggle from './toggle';
import styles from './document-row.sass';
import { ATTACHMENT_TYPES } from 'utils/constants';
import { trackOutboundLink } from 'utils/tracking';
import { EditModeContext } from 'contexts';

export default class DocumentRow extends Component {
  handleClick = () => {
    const { id, fileType, url } = this.props;
    if (fileType === ATTACHMENT_TYPES.DOCUMENT)
      browserHistory.push(`/document/${id}/`);
    else
      trackOutboundLink(url, '_blank');
  };

  render() {
    const { id, show, thumbnail, title, source, date, setDocumentShow, viewsCount, downloadsCount } = this.props;
    const { editModeOn } = this.context;
    return (
      <div
        onClick={ this.handleClick }
        className={ cx(styles.row, { 'document-faded': !show }) }>
        <span
          className='document-thumbnail'
          style={ thumbnail ? {
            backgroundImage: `url(${thumbnail})`,
          } : null }/>
        <span className={ cx('document-title', { 'document-faded': !show }) }>
          { title }
        </span>
        <span className={ cx('document-source', { 'document-faded': !show }) }>
          { source }
        </span>
        <span className={ cx('document-counts', { 'document-faded': !show }) }>
          <Counter
            viewsCount={ viewsCount }
            downloadsCount={ downloadsCount } />
        </span>
        <span className={ cx('document-date', { 'document-faded': !show }) }>
          { date }
        </span>
        <span className='document-toggle'>
          {
            editModeOn ? (
              <Toggle
                on={ show }
                onChange={ visible => setDocumentShow(id, !visible) }>
                { show ? 'show' : 'hide' }
              </Toggle>
            ) : null
          }
        </span>
      </div>
    );
  }
}

DocumentRow.contextType = EditModeContext;

DocumentRow.propTypes = {
  id: PropTypes.number,
  show: PropTypes.bool,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  source: PropTypes.string,
  date: PropTypes.string,
  setDocumentShow: PropTypes.func,
  viewsCount: PropTypes.number,
  downloadsCount: PropTypes.number,
  fileType: PropTypes.string,
  url: PropTypes.string,
};
