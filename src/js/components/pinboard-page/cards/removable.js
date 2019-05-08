import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './removable.sass';
import { startAnimation } from 'utils/animation';


export default function removable(CardComponent) {
  class Removable extends Component {
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

    render() {
      const { isAdded } = this.props;

      return (
        <div className={ cx(styles.removable, { hide: isAdded }) } ref={ el => this.el = el }>
          <CardComponent { ...this.props } removeItem={ this.removeItem }/>
        </div>
      );
    }
  }

  Removable.propTypes = {
    item: PropTypes.object,
    removeItemInPinboardPage: PropTypes.func,
    isAdded: PropTypes.bool,
  };

  Removable.defaultProps = {
    isAdded: false,
    removeItemInPinboardPage: () => {},
  };

  return Removable;
}
