import React, { Component } from 'react';
import { get, noop, omit } from 'lodash';
import cx from 'classnames';

import { UNDO_CARD_THEMES, UNDO_CARD_VISIBLE_TIME, PINBOARD_ITEM_REMOVE_MODE } from 'utils/constants';
import styles from './with-undo-card.sass';

const DISPLAY = 'DISPLAY';
const REMOVING = 'REMOVING';
const REMOVED = 'REMOVED';
const defaultSettings = {
  theme: UNDO_CARD_THEMES.LIGHT,
  keepVisible: false,
  hasWrapper: false,
  isRequestDelay: true,
  revertActionName: null,
};

export default function withUndoCard(
  WrappedComponent,
  getText,
  actionName,
  settings=defaultSettings) {

  settings = { ...defaultSettings, ...settings };

  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        status: DISPLAY,
      };
      this.act = this.act.bind(this);
      this.actOnDelay = this.actOnDelay.bind(this);
      this.revert = this.revert.bind(this);
      this.undo = this.undo.bind(this);
      this.countdown = undefined;
      this.removingItem = undefined;
    }

    componentWillUnmount() {
      clearTimeout(this.countdown);
    }

    act(item) {
      this.setState({
        status: REMOVING,
      });

      get(this.props, actionName, noop)({
        ...item,
        mode: PINBOARD_ITEM_REMOVE_MODE.API_ONLY,
      });
      this.removingItem = item;

      this.countdown = setTimeout(() => {
        this.setState({
          status: REMOVED,
        });

        get(this.props, actionName, noop)({
          ...item,
          mode: PINBOARD_ITEM_REMOVE_MODE.STATE_ONLY,
        });
        this.removingItem = undefined;
      }, UNDO_CARD_VISIBLE_TIME);
    }

    actOnDelay(item) {
      this.setState({
        status: REMOVING,
      });

      this.countdown = setTimeout(() => {
        this.setState({
          status: REMOVED,
        });

        get(this.props, actionName, noop)(item);
      }, UNDO_CARD_VISIBLE_TIME);
    }

    revert() {
      const { revertActionName } = settings;

      if (this.removingItem) {
        get(this.props, revertActionName, noop)({ ...this.removingItem, isPinned: false });
      }
    }

    undo() {
      const { isRequestDelay } = settings;

      clearTimeout(this.countdown);

      this.setState({
        status: DISPLAY,
      });

      if (!isRequestDelay) {
        this.revert();
      }
    }

    render() {
      const { status } = this.state;
      const { theme, keepVisible, hasWrapper, isRequestDelay, revertActionName } = settings;

      if (status === REMOVED && !keepVisible) {
        return null;
      }

      if (status === REMOVING) {
        const wrapperStyle = cx(
          { [styles.undoCardLight]: theme === UNDO_CARD_THEMES.LIGHT },
          { [styles.undoCardDark]: theme === UNDO_CARD_THEMES.DARK },
          { [styles.wrapper]: hasWrapper },
          'test--undo-card'
        );

        return (
          <div className={ wrapperStyle }>
            <span className='text'>{ getText(this.props) }</span>
            <button className='undo-button' onClick={ this.undo }>Undo</button>
          </div>
        );
      }

      const passingProps = omit(this.props, [actionName, revertActionName]);
      passingProps[actionName] = isRequestDelay ? this.actOnDelay : this.act;
      passingProps[revertActionName] = this.revert;

      return <WrappedComponent { ...passingProps }/>;
    }
  };
}
