import React, { Component, PropTypes } from 'react';

import { whiteTwoColor } from 'utils/styles';


export default class HeaderWidget extends Component {
  render() {
    const { title, showHR } = this.props;
    return (
      <div className='test--header-widget' style={ styles.container }>
        { title }
      </div>
    );
  }
}

HeaderWidget.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = {
  container: {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 600,
    padding: '23px 16px',
    backgroundColor: 'white',
    margin: '0 -8px',
  },
};
