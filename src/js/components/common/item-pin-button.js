import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';
import { every, isEmpty } from 'lodash';

import withPinnable from 'components/common/with-pinnable';
import styles from 'components/common/item-pin-button.sass';
import { isPinButtonIntroductionVisited, setPinButtonIntroductionVisited } from 'utils/pinboard';


class ItemPinButton extends Component {
  onIntroductionClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setPinButtonIntroductionVisited();
    this.forceUpdate();
  };

  render() {
    const { className, showHint, item, items, showIntroduction } = this.props;
    const isPinned = every(isEmpty(items) ? [item] : items, item => item.isPinned);
    const shouldShowIntroduction = showIntroduction && !isPinButtonIntroductionVisited();
    return (
      <div className={ cx(
        'pinboard-feature',
        styles.itemPinButton,
        className,
        { 'is-pinned': isPinned, 'show-introduction': shouldShowIntroduction }
      ) }>
        <div className='pin-button' />
        { showHint && <div className='pin-action-hint'> Unpin? </div> }
        {
          shouldShowIntroduction
          && <div className='pin-button-introduction' onClick={ this.onIntroductionClick }>
            Tap this button to add to your pinboard</div>
        }
      </div>
    );
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
};

ItemPinButton.defaultProps = {
  showHint: true,
  showIntroduction: false,
};

export default withPinnable(ItemPinButton);
