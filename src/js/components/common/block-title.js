import React, { PropTypes } from 'react';
import { greyishColor } from 'utils/styles';

const style = {
  fontSize: '14px',
  padding: '36px 16px 8px 0',
  color: greyishColor
};

const BlockTitle = ({ children, ...props }) => (
  <div style={ style } { ...props } >{ children }</div>
);

BlockTitle.propTypes = {
  children: PropTypes.string
};

export default BlockTitle;
