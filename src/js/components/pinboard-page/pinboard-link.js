import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { omit } from 'lodash';

export const CONFIRM_MESSAGE = `
  Pinboard is saving, changes you made may not be saved.
  Are you sure you want to navigate away from this page?
`;

export default class PinboardLink extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { saving, onClick } = this.props;
    e.stopPropagation();
    if (!saving || window.confirm(CONFIRM_MESSAGE)) {
      onClick(e);
    }
  }

  render() {
    const { customComponent } = this.props;
    const componentProps = omit(this.props, 'onClick', 'saving', 'customComponent');
    const ContentComponent = customComponent || Link;

    return (
      <ContentComponent { ...componentProps } onClick={ this.handleClick } />
    );
  }
}

PinboardLink.propTypes = {
  saving: PropTypes.bool,
  customComponent: PropTypes.string,
};
