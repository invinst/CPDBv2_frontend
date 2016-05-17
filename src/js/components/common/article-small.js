import React, { PropTypes } from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import CloseButtonWrapper from 'components/common/close-btn-wrapper';
import Toggleable from 'components/common/toggleable';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import {
  wrapperStyle, tabletWrapperStyle, contentStyle, extraWideWrapperStyle
} from './article-small.style';


class ArticleSmall extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [TABLET]: {
        wrapper: [wrapperStyle, tabletWrapperStyle, this.props.style]
      },
      [DESKTOP]: {
        wrapper: [wrapperStyle, this.props.style]
      },
      [EXTRA_WIDE]: {
        wrapper: [wrapperStyle, extraWideWrapperStyle, this.props.style]
      }
    };
  }

  renderHeader() {
    if (this.props.header) {
      return (
        <ArticleHeader>{ this.props.header }</ArticleHeader>
      );
    }
    return null;
  }

  renderWithResponsiveStyle(style) {
    return (
      <div className='article-small' style={ style.wrapper }>
        <div style={ contentStyle }>
          { this.renderHeader() }
          { this.props.children }
        </div>
        <CloseButtonWrapper
          expanded={ this.props.expanded } showButton={ this.props.active }
          position={ this.props.expandDirection }
          buttonClassName='article-small__close-button'/>
      </div>
    );
  }
}

ArticleSmall.propTypes = {
  style: PropTypes.object,
  header: PropTypes.string,
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  expandDirection: PropTypes.string,
  active: PropTypes.bool
};

ArticleSmall.defaultProps = {
  content: 'How to predict bad cops in Chicago.'
};

export default Toggleable(Radium(ArticleSmall));
