import React, { PropTypes } from 'react';
import cx from 'classnames';

import styles from './header-button.sass';

export default class NavigationHeaderLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { scrollPosition, buttonText, navigationLink } = this.props;

    return (
      <a className={ cx(styles.headerButton, scrollPosition) } href={ navigationLink }>{ buttonText }</a>
    );
  }
}

NavigationHeaderLink.propTypes = {
  scrollPosition: PropTypes.string,
  buttonText: PropTypes.string,
  navigationLink: PropTypes.string.isRequired,
};

NavigationHeaderLink.defaultProps = {
  scrollPosition: 'top',
  buttonText: 'Share',
};
