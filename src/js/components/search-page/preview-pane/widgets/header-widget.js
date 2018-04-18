import React, { Component, PropTypes } from 'react';

import { wrapperStyle } from './header-widget.style';


export default class HeaderWidget extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className='test--header-widget' style={ wrapperStyle }>
        { title }
      </div>
    );
  }
}

HeaderWidget.propTypes = {
  title: PropTypes.string.isRequired,
};

