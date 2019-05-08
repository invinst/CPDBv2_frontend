import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './base-card.sass';
import { startAnimation } from 'utils/animation';


export default class BaseCard extends Component {
  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    const { isAdded } = this.props;
    if (isAdded) {
      startAnimation(() => this.el.classList.add('fade-in'));
    }
  }

  removeItem() {
    this.el.classList.add('fade-out');

    const { item, removeItemInPinboardPage } = this.props;
    const { type, id, isPinned } = item;

    setTimeout(
      () => removeItemInPinboardPage({ type, id, isPinned }),
      1000
    );
  }

  renderContent() {
    return null;
  }

  render() {
    const { isAdded } = this.props;

    return (
      <div className={ cx(styles.baseCard, { hide: isAdded }) } ref={ el => this.el = el }>
        { this.renderContent() }
      </div>
    );
  }
}

BaseCard.propTypes = {
  children: PropTypes.node,
  item: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
  isAdded: PropTypes.bool,
};

BaseCard.defaultProps = {
  isAdded: false,
  removeItemInPinboardPage: () => {},
};
