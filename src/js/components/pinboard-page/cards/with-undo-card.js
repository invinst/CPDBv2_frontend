import React, { Component } from 'react';
import { get, noop } from 'lodash';

import * as constants from 'utils/constants';
import './with-undo-card.sass';


export default function withUndoCard(
  WrappedComponent,
  getText,
  actionName,
  style={
    theme: constants.UNDO_CARD_THEMES.LIGHT,
    wrapperStyle: null,
    keepVisible: false
  }) {
  const DISPLAY = 'DISPLAY';
  const REMOVING = 'REMOVING';
  const REMOVED = 'REMOVED';

  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        state: DISPLAY
      };

      this.action = this.action.bind(this);
      this.undo = this.undo.bind(this);
      this.countdown = undefined;
    }

    componentWillUnmount() {
      clearTimeout(this.countdown);
    }

    action(item) {
      this.setState({
        state: REMOVING
      });

      this.countdown = setTimeout(() => {
        this.setState({
          state: REMOVED
        });

        get(this.props, actionName, noop)(item);
      }, constants.UNDO_CARD_VISIBLE_TIME);
    }

    undo() {
      clearTimeout(this.countdown);

      this.setState({
        state: DISPLAY
      });
    }

    render() {
      const { state } = this.state;
      const { keepVisible } = style;

      if (state === REMOVED && !keepVisible) {
        return null;
      }

      if (state === REMOVING) {
        const { theme, wrapperStyle } = style;

        return (
          <div className={ `undo-card-${theme}` } style={ wrapperStyle }>
            <span className='text'>{ getText(this.props) }</span>
            <button className='undo-button' onClick={ this.undo }>Undo</button>
          </div>
        );
      }

      return <WrappedComponent { ...this.props } { ...{ [actionName]: this.action } }/>;
    }
  };
}
