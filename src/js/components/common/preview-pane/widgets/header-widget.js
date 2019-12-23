import React, { PropTypes } from 'react';

import { wrapperStyle } from './header-widget.style';


export default function HeaderWidget(props) {
  const { title } = props;
  return (
    <div className='test--header-widget' style={ wrapperStyle }>
      { title }
    </div>
  );
}

HeaderWidget.propTypes = {
  title: PropTypes.string.isRequired,
};

