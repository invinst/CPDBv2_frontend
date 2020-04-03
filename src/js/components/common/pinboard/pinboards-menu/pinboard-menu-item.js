import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEmpty, noop } from 'lodash';
import cx from 'classnames';

import PinboardLinkContainer from 'containers/pinboard-page/pinboard-link-container';
import styles from './pinboard-menu-item.sass';


export default class PinboardMenuItem extends Component {
  handlePinboardMenuItemClick = () => {
    const { onClick, pinboard } = this.props;
    onClick(pinboard);
  };

  render() {
    const { pinboard: { title, isPinned, createdAt } } = this.props;
    return (
      <PinboardLinkContainer
        customComponent='div'
        className={ styles.pinboardMenuItem }
        onClick={ this.handlePinboardMenuItemClick }
      >
        <div className={ cx(
          'pinboard-item',
          { 'untitled-pinboard': isEmpty(title) },
          { 'is-pinned': isPinned }) }>
          <div className='pinboard-info'>
            <div className='pinboard-title'>{ title }</div>
            <div className='pinboard-created-at'>Created { createdAt }</div>
          </div>
          <div className='pin-button' />
          <div className='clearfix' />
        </div>

      </PinboardLinkContainer>
    );
  }
}

PinboardMenuItem.propTypes = {
  pinboard: PropTypes.object,
  onClick: PropTypes.func,
};

PinboardMenuItem.defaultProps = {
  onClick: noop,
};
