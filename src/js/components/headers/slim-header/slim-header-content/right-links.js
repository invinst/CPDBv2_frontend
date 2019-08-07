import React, { Component, PropTypes } from 'react';
import config from 'config';
import cx from 'classnames';

import { QA_LINK } from 'utils/constants';
import styles from 'components/headers/slim-header/slim-header-content/right-links.sass';

export default class RightLinks extends Component {
  render() {
    const { position } = this.props;
    const links = [
      {
        name: 'Data',
        url: config.v1Url
      },
      {
        name: 'Q&A',
        url: QA_LINK
      },
      {
        name: 'Documents',
        url: '/documents/'
      }
    ];

    const tags = links.map((link, index) => (
      <a
        className={ cx('right-link', position) }
        onClick={ e => { e.stopPropagation(); } }
        key={ index }
        href={ link.url }
      >
        { link.name }
      </a>
    ));

    return (
      <div className={ styles.rightLinks }>{ tags }</div>
    );
  }
}

RightLinks.propTypes = {
  position: PropTypes.string,
};
