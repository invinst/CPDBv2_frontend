import React from 'react';

export const breadcrumbItem = (props) => {
  const style = {
    display: 'inline-block',
    paddingLeft: '5px',
    paddingRight: '5px'
  };
  return (
    <li style={ style }>{props.children}</li>
  );
};
