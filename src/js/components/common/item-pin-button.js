import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';
import { every, isEmpty } from 'lodash';

import withPinnable from 'components/common/with-pinnable';
import styles from 'components/common/item-pin-button.sass';
import { isPinButtonIntroductionVisited, setPinButtonIntroductionVisited } from 'utils/pinboard';
import { PINBOARD_INTRODUCTION_DELAY } from 'utils/constants';


class ItemPinButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayIntroduction: false,
    };
  }

  componentDidMount() {
    this.displayIntroductionTimeout = setTimeout(() => {
      if (this.shouldShowIntroduction()) {
        this.addEventClickOutside();
        this.setState({ displayIntroduction: true });
      }
    }, PINBOARD_INTRODUCTION_DELAY);
  }

  componentWillUnmount() {
    if (this.shouldShowIntroduction()) {
      this.removeEventClickOutside();
    }
    clearTimeout(this.displayIntroductionTimeout);
  }

  handleClickOutside = ({ target }) => {
    if (target.closest('.content-wrapper') && !target.closest('.pin-button-introduction')) {
      setPinButtonIntroductionVisited();
      this.forceUpdate();
      this.removeEventClickOutside();
    }
  };

  shouldShowIntroduction() {
    const { showIntroduction } = this.props;

    return showIntroduction && !isPinButtonIntroductionVisited();
  }

  addEventClickOutside() {
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  removeEventClickOutside() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const { className, showHint, item, items } = this.props;
    const { displayIntroduction } = this.state;
    const isPinned = every(isEmpty(items) ? [item] : items, item => item.isPinned);
    const shouldShowIntroduction = this.shouldShowIntroduction();

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
          &&
            <div className={ cx('pin-button-introduction', { 'display-introduction': displayIntroduction }) }>
              Tap this button to add to your pinboard
            </div>
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
