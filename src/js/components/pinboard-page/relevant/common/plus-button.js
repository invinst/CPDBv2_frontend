import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import styles from './plus-button.sass';


export class PlusButton extends Component {
  render() {
    const { className, onClick } = this.props;
    return (
      <div className={ cx(styles.plusButton, className) } onClick={ onClick }>
        <div className='inner-circle'/>
      </div>
    );
  }
}

PlusButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default PlusButton;
