import React, { Component, PropTypes } from 'react';
import Breadcrumbs from 'redux-breadcrumb-trail';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import {
  outerStyle,
  navBarStyle,
  headerPlaceholderStyle,
  breadcrumbSeparatorStyle
} from './shareable-header.style';
import BreadcrumbsItemRendererContainer from 'containers/headers/shareable-header/breadcrumbs-item-renderer-container';
import { breadcrumbsStyle } from 'components/headers/shareable-header/shareable-header.style';
import ShareButton from 'components/headers/shareable-header/share-button';
import { calculatePosition } from 'utils/dom';
import printStyles from 'components/common/print.sass';


export default class ShareableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'top'
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.closeShareMenu);
    addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeShareMenu);
    removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const newPosition = calculatePosition();
    if (newPosition !== this.state.position) {
      this.setState({ position: newPosition });
    }
    this.props.updateShareablePageScrollPosition(this.state.position);
  }

  render() {
    const { location, routes, params } = this.props;

    const separatorRenderer = () => <li style={ breadcrumbSeparatorStyle }/>;

    return (
      <div>
        <div style={ headerPlaceholderStyle }/>
        <ResponsiveFluidWidthComponent style={ outerStyle }>
          <div
            className={ printStyles.hideForPrint }
            style={ navBarStyle }
            ref={ el => { this.placeholderElement = el; } }
          >
            <ShareButton scrollPosition={ this.state.position }/>
            <Breadcrumbs
              className='test--breadcrumbs'
              routes={ routes }
              params={ params }
              location={ location }
              separatorRenderer={ separatorRenderer }
              itemRenderer={ BreadcrumbsItemRendererContainer }
              style={ breadcrumbsStyle }
            />
          </div>
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

ShareableHeader.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
  closeShareMenu: PropTypes.func,
  openShareMenu: PropTypes.func,
  shareMenuIsOpen: PropTypes.bool,
  updateShareablePageScrollPosition: PropTypes.func,
};

ShareableHeader.defaultProps = {
  params: {},
  location: {
    pathname: ''
  },
  routes: []
};
