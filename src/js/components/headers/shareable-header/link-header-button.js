import React, { PropTypes } from 'react';

import styles from './link-header-button.sass';


export default class LinkHeaderButton extends React.Component {
  handleClick() {
    const { link } = this.props;
    window.open(link, '_blank');
  }

  render() {
    const { buttonText } = this.props;

    return (
      <div className={ styles.linkHeaderButton }>
        <span
          className='button'
          onClick={ this.handleClick.bind(this) }
        >
          { buttonText }
        </span>
      </div>
    );
  }
}

LinkHeaderButton.propTypes = {
  buttonText: PropTypes.string,
  link: PropTypes.string
};

LinkHeaderButton.defaultProps = {
  buttonText: 'Click',
  link: '/'
};
