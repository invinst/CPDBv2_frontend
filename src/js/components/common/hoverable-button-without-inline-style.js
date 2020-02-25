import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';


export default function HoverableButtonWithoutInlineStyle(props) {
  const { onClick, children, disabled, className, disabledClassName } = props;
  const _className = classNames('link--transition', 'hoverable-button', className, { [disabledClassName]: disabled });

  return (
    <a
      className={ _className }
      onClick={ !disabled ? onClick : null }>
      { children }
    </a>
  );
}

HoverableButtonWithoutInlineStyle.propTypes = {
  className: PropTypes.string,
  disabledClassName: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

HoverableButtonWithoutInlineStyle.defaultProps = {
  className: '',
  disabledClassName: '',
};
