import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'lodash';

import styles from './with-overlay.sass';


function withOverlay(ContentComponent) {
  class WithOverlay extends Component {
    componentDidUpdate(prevProps) {
      const { isShown } = this.props;
      if (prevProps.isShown !== isShown) {
        if (isShown) {
          document.body.classList.add('body-not-scrollable');
        } else {
          document.body.classList.remove('body-not-scrollable');
        }
      }
    }

    componentWillUnmount() {
      document.body.classList.remove('body-not-scrollable');
    }

    render() {
      const { isShown, handleClose } = this.props;

      return (
        <div className={ styles.withOverlay }>
          <div
            className='overlay'
            aria-hidden={ !isShown }
            onClick={ handleClose }
          />
          <ContentComponent { ...this.props } />
        </div>
      );
    }
  }

  WithOverlay.propTypes = {
    isShown: PropTypes.bool,
    handleClose: PropTypes.func,
  };

  WithOverlay.defaultProps = {
    isShown: false,
    handleClose: noop,
  };

  return WithOverlay;
}
export default withOverlay;
