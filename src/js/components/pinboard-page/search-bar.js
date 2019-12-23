import React, { Component, PropTypes } from 'react';
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
  }

  closeShareMenu = e => {
    if (this.state.shareMenuOpen) {
      this.setState({ shareMenuOpen: false });
      e.stopPropagation();
    }
  };

  goToSearchPage(e) {
    pushPathPreserveEditMode(`/${SEARCH_PATH}`);
    e.stopPropagation();
  }

  handleShareButtonClick = e => {
    this.setState((state, props) => ({
      shareMenuOpen: !state.shareMenuOpen,
    }));
    e.stopPropagation();
  };

  renderShareMenu() {
    const shareMenu = (
      <div className='share-menu'>
        <ClipboardButton
          className='share-menu-item'
          onClick={ this.closeShareMenu }
          data-clipboard-text={ window.location.href }
        >
          <div>
            <span className='copy-link-icon' />
            Copy link
          </div>
        </ClipboardButton>
      </div>
    );

    return this.state.shareMenuOpen && shareMenu;
  }

  render() {
    const { shareable, customButtons } = this.props;
    return (
      <div className={ styles.wrapper }>
        <div className={ cx(responsiveContainerStyles.responsiveContainer, 'search-box-parent') }>
          <div className='search-input' onClick={ this.goToSearchPage }>Search</div>
          <div className='right-buttons'>
            { !shareable ? null : (
              <div
                className='share-button'
                onClick={ this.handleShareButtonClick }>
                { this.renderShareMenu() }
              </div>
            ) }
            { customButtons }
          </div>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  shareable: PropTypes.bool,
  customButtons: PropTypes.element,
};

SearchBar.defaultProps = {
  shareable: true,
};
