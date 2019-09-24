import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash';

import styles from './pinboards.sass';
import withOverlay from 'components/common/with-overlay';
import SlideMotion from 'components/animation/slide-motion';


class Pinboards extends Component {
  componentWillReceiveProps(nextProps) {
    const { isShown, fetchPinboards } = nextProps;

    if (!this.props.isShown && isShown) {
      fetchPinboards();
    }
  }

  render() {
    const { pinboards, isShown } = this.props;

    return (
      <SlideMotion show={ isShown } offsetX={ 100 }>
        <div className={ styles.pinboards }>
          <div className='pinboards-title'>
            Pinboards
            <a className='new-pinboard-btn' />
          </div>
          {
            pinboards.map((pinboard) => (
              <a
                key={ pinboard.id }
                className={ cx('pinboard-item', { 'untitled-pinboard': isEmpty(pinboard.title) }) }
                href={ pinboard.url }
              >
                <div className='pinboard-title'>{ pinboard.title }</div>
                <div className='pinboard-created-at'>Created { pinboard.createdAt }</div>
              </a>
            ))
          }
        </div>
      </SlideMotion>
    );
  }
}

Pinboards.propTypes = {
  pinboards: PropTypes.array,
  fetchPinboards: PropTypes.func,
  isShown: PropTypes.bool,
};

Pinboards.defaultProps = {
  pinboards: [],
  isShown: false,
};

export default withOverlay(Pinboards);
