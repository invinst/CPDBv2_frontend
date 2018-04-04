import React, { Component, PropTypes } from 'react';


export default class HeaderWidget extends Component {
  render() {
    return (
      <div className='test--header-widget'>
        { this.props.title }
      </div>
    );
  }
}

HeaderWidget.propTypes = {
  title: PropTypes.string
};
