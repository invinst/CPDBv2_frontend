import React, { Component, PropTypes } from 'react';
import config from 'config';
import cx from 'classnames';
import { Link } from 'react-router';

import { QA_LINK } from 'utils/constants';
import styles from 'components/headers/slim-header/slim-header-content/right-links.sass';

export default class RightLinks extends Component {
  render() {
    const { position } = this.props;
    const links = [
      {
        name: 'Data',
        itemComponent: 'a',
        attrs: {
          href: config.v1Url,
        },
      },
      {
        name: 'Q&A',
        itemComponent: 'a',
        attrs: {
          href: QA_LINK,
        },
      },
      {
        name: 'Documents',
        itemComponent: Link,
        attrs: {
          to: '/documents/',
        },
      },
      {
        name: 'Pinboards',
        itemComponent: Link,
        attrs: {
          to: '/pinboard/',
        },
      },
    ];

    const tags = links.map((link, index) => (
      <link.itemComponent
        className={ cx('right-link', position) }
        onClick={ e => { e.stopPropagation(); } }
        key={ index }
        { ...link.attrs }
      >
        { link.name }
      </link.itemComponent>
    ));

    return (
      <div className={ styles.rightLinks }>{ tags }</div>
    );
  }
}

RightLinks.propTypes = {
  position: PropTypes.string,
};
