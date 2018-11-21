import React, { Component, PropTypes } from 'react';

import style from './navigation-button.sass';
import printStyles from 'components/common/print.sass';


export default class NavigationButton extends Component {
  render() {
    const { text } = this.props;

    return (
      <div className={ `${style.navigationButton} ${printStyles.hideForPrint}` }>
        <span className='navigation-button-text'>{ text }</span>
        <div className='navigation-button-arrow'/>
      </div>
    );
  }
}

NavigationButton.propTypes = {
  text: PropTypes.string
};
