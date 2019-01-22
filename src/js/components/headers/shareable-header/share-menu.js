import React, { PropTypes } from 'react';
import ClipboardButton from 'react-clipboard.js/dist/react-clipboard';

import styles from './share-menu.sass';
import { imgUrl } from 'utils/static-assets';
import config from 'config';


export default class ShareMenu extends React.Component {
  render() {
    const { open, closeShareMenu } = this.props;

    if (!open) {
      return null;
    }

    const encodedLink = encodeURIComponent(window.location.href);

    return (
      <div className={ `${styles.shareMenu} test--shareable-header--share-menu` }>
        <ClipboardButton
          className='share-button-item'
          onClick={ closeShareMenu }
          data-clipboard-text={ window.location.href }
        >
          Copy Link
        </ClipboardButton>

        <a
          className='share-button-link-item'
          href={ `https://twitter.com/intent/tweet?url=${encodedLink}&via=${config.twitterBotName}` }
          target='_blank'
          onClick={ closeShareMenu }
        >
          Twitter<img className='share-menu-img' src={ imgUrl('ic-twitter.svg') } />
        </a>

        <a
          className='share-button-link-item'
          href={ 'https://www.facebook.com/sharer/sharer.php?u=' + encodedLink }
          target='_blank'
          onClick={ closeShareMenu }
        >
          Facebook<img className='share-menu-img' src={ imgUrl('ic-facebook.svg') } />
        </a>
      </div>
    );
  }
}

ShareMenu.propTypes = {
  hovering: PropTypes.bool,
  open: PropTypes.bool,
  closeShareMenu: PropTypes.func,
};

ShareMenu.defaultProps = {
  open: true
};
