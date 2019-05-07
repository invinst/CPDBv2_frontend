import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';


export default class EditModeItem extends Component {
  render() {
    const {
      aliasEditModeOn,
      className,
      onClick,
      redirectLink,
      redirectUrl,
      children
    } = this.props;

    const commonWrapperProps = {
      className,
      onClick
    };

    let result;
    if (aliasEditModeOn) {
      result = <div { ...commonWrapperProps }>{ children }</div>;
    } else if (redirectLink) {
      result = <Link { ...commonWrapperProps } to={ redirectLink }>{ children }</Link>;
    } else {
      result = <a { ...commonWrapperProps } href={ redirectUrl }>{ children }</a>;
    }

    return result;
  }
}

EditModeItem.propTypes = {
  aliasEditModeOn: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  redirectLink: PropTypes.string,
  redirectUrl: PropTypes.string,
  children: PropTypes.node
};
