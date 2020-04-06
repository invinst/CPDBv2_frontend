import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { calculatePosition } from 'utils/dom';
import styles from './shareable-header.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';
import BreadcrumbContainer from 'containers/breadcrumb';


export default class ShareableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'top',
    };
  }

  componentDidMount() {
    addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const newPosition = calculatePosition();
    if (newPosition !== this.state.position) {
      this.setState({ position: newPosition });
    }
    this.props.updateShareablePageScrollPosition(this.state.position);
  };

  render() {
    const { headerButtons } = this.props;

    return (
      <div className={ `${styles.shareableHeader} no-print` }>
        <div className='shareable-header-header-placeholder'/>
        <div className='shareable-header-outer'>
          <div className={ responsiveContainerStyles.responsiveContainer }>
            <div className='shareable-header-nav-bar'>
              <div className='right-buttons'>
                { headerButtons }
              </div>
              <BreadcrumbContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShareableHeader.propTypes = {
  updateShareablePageScrollPosition: PropTypes.func,
  headerButtons: PropTypes.element,
};
