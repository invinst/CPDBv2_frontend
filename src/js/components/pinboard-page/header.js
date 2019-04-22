import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import config from 'config';
import { Link } from 'react-router';

import { QA_LINK } from 'utils/constants';
import styles from './header.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';

const MENU_ITEMS = [
  {
    name: 'Data',
    internal: false,
    link: config.v1Url,
  },
  {
    name: 'Q&A',
    internal: false,
    link: QA_LINK,
  },
  {
    name: 'Documents',
    internal: true,
    link: '/documents/',
  },
  {
    name: 'Pinboard',
    internal: true,
    link: '/',
  },
];


export default class Header extends Component {
  renderRightMenu() {
    const { choice } = this.props;

    const items = MENU_ITEMS.map((item) => {
      if (item.internal) {
        return (
          <Link
            key={ item.name }
            className={ cx('menu-item', { 'highlight': choice === item.name }) }
            to={ choice !== item.name ? item.link : null }>
            { item.name }
          </Link>
        );
      }
      return (
        <a
          key={ item.name }
          className={ cx('menu-item', { 'highlight': choice === item.name }) }
          href={ choice !== item.name ? item.link : null }>
          { item.name }
        </a>
      );
    });

    return (
      <div className='right-menu'>
        { items }
      </div>
    );
  }

  render() {
    return (
      <div className={ styles.wrapper } >
        <div className={ cx(responsiveContainerStyles.responsiveContainer, 'inner-wrapper') }>
          <div className='header-parent'>
            <Link
              className='header-title'
              to='/'>
              cpdp
            </Link>
            { this.renderRightMenu() }
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  choice: PropTypes.string,
};

Header.defaultProps = {
  choice: MENU_ITEMS[3].name,
};
