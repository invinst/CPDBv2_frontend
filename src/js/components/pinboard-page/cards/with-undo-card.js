import React, { Component, PropTypes } from 'react';

import { noop } from 'lodash';
import cx from 'classnames';

import styles from './with-undo-card.sass';


export default function withUndoCard(
  WrappedComponent,
  countdown,
  getText) {
  const DISPLAY = 'DISPLAY';
  const REMOVING = 'REMOVING';
  const REMOVED = 'REMOVED';

  class _Base extends Component {
    constructor(props) {
      super(props);

      this.state = {
        state: DISPLAY
      };

      this.removeItem = this.removeItem.bind(this);
      this.undo = this.undo.bind(this);
      this.countdown = undefined;
    }

    componentWillUnmount() {
      clearTimeout(this.countdown);
    }

    removeItem(item) {
      this.setState({
        state: REMOVING
      });

      this.countdown = setTimeout(() => {
        this.setState({
          state: REMOVED
        });

        const { removeItemInPinboardPage } = this.props;

        removeItemInPinboardPage(item);
      }, countdown);
    }

    undo() {
      clearTimeout(this.countdown);

      this.setState({
        state: DISPLAY
      });
    }

    render() {
      const { state } = this.state;

      if (state === REMOVED) {
        return null;
      }

      if (state === REMOVING) {
        return (
          <div className={ cx(styles.undoCard, 'test--undo-card') }>
            <span className='text'>{ getText(this.props) }</span>
            <button className='undo-button' onClick={ this.undo }>Undo</button>
          </div>
        );
      }

      return <WrappedComponent { ...this.props } removeItemInPinboardPage={ this.removeItem }/>;
    }
  }

  _Base.propTypes = {
    removeItemInPinboardPage: PropTypes.func,
  };

  _Base.defaultProps = {
    removeItemInPinboardPage: noop
  };

  return _Base;
}
