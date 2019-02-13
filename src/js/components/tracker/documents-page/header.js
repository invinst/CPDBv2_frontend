import React, { Component, PropTypes } from 'react';
import Breadcrumbs from 'redux-breadcrumb-trail';
import cx from 'classnames';

import BreadcrumbsItemRendererContainer from 'containers/headers/shareable-header/breadcrumbs-item-renderer-container';
import responsiveContainerStyles from 'components/common/responsive-container.sass';
import styles from './header.sass';


export default class Header extends Component {
  render() {
    const { routes, params, location } = this.props;

    const separatorRenderer = <li className='shareable-header-breadcrumb-separator'/>;

    return (
      <div>
        <div className={ styles.wrapper }>
          <div className={ cx(responsiveContainerStyles.responsiveContainer, 'breadcrumbs-container') }>
            <Breadcrumbs
              className='breadcrumbs'
              routes={ routes }
              params={ params }
              location={ location }
              separatorRenderer={ separatorRenderer }
              itemRenderer={ BreadcrumbsItemRendererContainer }
            />
          </div>
        </div>
        <div className={ styles.breadcrumbsPlaceholder }/>
      </div>
    );
  }
}

Header.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array
};
