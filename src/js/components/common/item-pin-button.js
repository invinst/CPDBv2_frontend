import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import cx from 'classnames';
// import { every, isEmpty } from 'lodash';

import withPinnable from 'components/common/with-pinnable';
// import styles from 'components/common/item-pin-button.sass';
import { DEFAULT_PINBOARD_PATH } from 'utils/constants';
import browserHistory from 'utils/history';


class ItemPinButton extends Component {
  handleClickHint = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { pinboardUrl } = this.props;
    browserHistory.push(pinboardUrl);
  };

  render() {
    // const { item, items } = this.props;
    // const isPinned = every(isEmpty(items) ? [item] : items, item => item.isPinned);

    return (null);
    // (
    //  <div className={ cx(
    //     'pinboard-feature',
    //     styles.itemPinButton,
    //     className,
    //     { 'is-pinned': isPinned, 'show-introduction': showIntroduction }
    //   ) }>
    //     <div className='pin-button' />
    //     { showHint && <div className='pin-action-hint' onClick={ this.handleClickHint }> Unpin? </div> }
    //   </div>
    // );
  }
}

ItemPinButton.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPinned: PropTypes.bool,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPinned: PropTypes.bool,
  })),
  addOrRemoveItemInPinboard: PropTypes.func,
  className: PropTypes.string,
  showHint: PropTypes.bool,
  showIntroduction: PropTypes.bool,
  pinboardUrl: PropTypes.string,
  visitPinButtonIntroduction: PropTypes.func,
};

ItemPinButton.defaultProps = {
  showHint: true,
  showIntroduction: false,
  pinboardUrl: DEFAULT_PINBOARD_PATH,
};

export default withPinnable(ItemPinButton);
