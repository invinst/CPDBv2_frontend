import React, { PropTypes } from 'react';

import { titleStyle } from './block-title.style';


const BlockTitle = ({ children, ...props }) => (
  <div style={ titleStyle } { ...props } >{ children }</div>
);

BlockTitle.propTypes = {
  children: PropTypes.string,
};

export default BlockTitle;
