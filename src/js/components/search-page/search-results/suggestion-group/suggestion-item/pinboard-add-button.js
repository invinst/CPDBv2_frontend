import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './pinboard-add-button.sass';


export default class PinboardAddButton extends Component {
  handlePinboardButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { addItemToPinboard, suggestion } = this.props;
    const { type, id, isPinned } = suggestion;

    addItemToPinboard({
      type: type,
      id: id,
      isPinned: isPinned,
    });
  }

  render() {
    const { isPinned } = this.props.suggestion;

    return (
      <span
        onClick={ this.handlePinboardButtonClick.bind(this) }
        className={ cx(styles.wrapper, 'pinboardbtn', { 'is-pinned': isPinned }) }
      />
    );
  }
}

PinboardAddButton.propTypes = {
  suggestion: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    isPinned: PropTypes.bool,
  }),
  onClick: PropTypes.func,
  addItemToPinboard: PropTypes.func,
};
