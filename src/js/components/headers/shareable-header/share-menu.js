import React, { PropTypes } from 'react';
import ClipboardButton from 'react-clipboard.js/dist/react-clipboard';

import {
  wrapperStyle,
  imgStyle,
  buttonItemStyle,
  linkItemStyle,
} from './share-menu.style';
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
      <div style={ wrapperStyle } className='test--shareable-header--share-menu'>
        <ClipboardButton
          style={ buttonItemStyle }
          onClick={ closeShareMenu }
          data-clipboard-text={ window.location.href }
        >
          Copy Link
        </ClipboardButton>

        <a
          style={ linkItemStyle }
          className='test--shareable-header--tweet-link'
          href={ `https://twitter.com/intent/tweet?url=${encodedLink}&via=${config.twitterBotName}` }
          target='_blank'
          onClick={ closeShareMenu }
        >
          Twitter<img style={ imgStyle } src={ imgUrl('ic-twitter.svg') } />
        </a>

        <a
          style={ { ...linkItemStyle, border: 0 } }
          className='test--shareable-header--facebook-link'
          href={ 'https://www.facebook.com/sharer/sharer.php?u=' + encodedLink }
          target='_blank'
          onClick={ closeShareMenu }
        >
          Facebook<img style={ imgStyle } src={ imgUrl('ic-facebook.svg') } />
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
