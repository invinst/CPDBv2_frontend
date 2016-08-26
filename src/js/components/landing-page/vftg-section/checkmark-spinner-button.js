import React, { Component, PropTypes } from 'react';

import FadeTransition from 'components/animation/fade-transition';
import Spinner from 'components/animation/spinner';
import Checkmark from 'components/animation/checkmark';
import Crossmark from 'components/animation/crossmark';
import { subscribeBtnStyle } from './checkmark-spinner-button.style';
import { FORM_INITIAL, FORM_LOADING, FORM_SUCCESS, FORM_FAILURE } from 'utils/constants';


export default class CheckmarkSpinnerButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  renderContent() {
    const { children } = this.props;
    switch (this.props.state) {
      case FORM_LOADING:
        return <Spinner key='spinner' />;
      case FORM_SUCCESS:
        return <Checkmark key='checkmark'/>;
      case FORM_FAILURE:
        return <Crossmark key='crossmark'/>;
      case FORM_INITIAL:
        return <span key='text'>{ children }</span>;
    }
  }

  render() {
    const { state, style } = this.props;
    return (
      <button onClick={ this.handleClick }
        style={ { ...subscribeBtnStyle, ...style } }
        disabled={ state !== FORM_INITIAL }>
        <FadeTransition>
          { this.renderContent() }
        </FadeTransition>
      </button>
    );
  }
}

CheckmarkSpinnerButton.propTypes = {
  onClick: PropTypes.func,
  state: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
};
