import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { actionButtonStyle, actionBarStyle } from 'components/search-page/search-terms/preview-pane/action-bar.style';
import HoverableButton from 'components/common/hoverable-button';


export default class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    browserHistory.push(`/search/?type=${this.props.contentType}&terms=${this.props.terms}`);
  }

  render() {
    return (
      <div className='test--preview-pane-action' style={ actionBarStyle }>
        <div>
          { this.props.children }
        </div>
        <HoverableButton
          className='test--enter-button'
          style={ actionButtonStyle }
          onClick={ this.handleClick }
        >
          enter
        </HoverableButton>
      </div>
    );
  }
}

ActionBar.defaultProps = {
  contentType: ''
};

ActionBar.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  terms: PropTypes.string,
  contentType: PropTypes.string,
};
