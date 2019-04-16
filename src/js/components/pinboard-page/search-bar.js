import React, { Component } from 'react';
import cx from 'classnames';
import ClipboardButton from 'react-clipboard.js/dist/react-clipboard';

import styles from './search-bar.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';
import { pushPathPreserveEditMode } from 'utils/edit-path';
import { SEARCH_PATH } from 'utils/constants';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shareMenuOpen: false,
    };

    this.handleShareButtonClick = this.handleShareButtonClick.bind(this);
    this.closeShareMenu = this.closeShareMenu.bind(this);
  }

  closeShareMenu(e) {
    if (this.state.shareMenuOpen) {
      this.setState({ shareMenuOpen: false });
      e.stopPropagation();
    }
  }

  goToSearchPage(e) {
    pushPathPreserveEditMode(`/${SEARCH_PATH}`);
    e.stopPropagation();
  }

  handleShareButtonClick(e) {
    this.setState((state, props) => ({
      shareMenuOpen: !state.shareMenuOpen,
    }));
    e.stopPropagation();
  }

  renderShareMenu() {
    const shareMenu = (
      <div className='share-menu'>
        <ClipboardButton
          className='share-menu-item'
          onClick={ this.closeShareMenu }
          data-clipboard-text={ window.location.href }
        >
          <span className='copy-link-icon' />
          Copy link
        </ClipboardButton>
      </div>
    );

    return this.state.shareMenuOpen && shareMenu;
  }

  render() {
    return (
      <div
        onClick={ this.goToSearchPage }
        className={ cx(styles.wrapper, 'test--search-bar') }>
        <div className={ cx(responsiveContainerStyles.responsiveContainer, 'inner-wrapper') }>
          <div className='search-box-parent'>
            <div className='search-icon' />
            <div className='search-term'>
              Search
            </div>
            <div
              className='share-button'
              onClick={ this.handleShareButtonClick }>
              Share
              { this.renderShareMenu() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
