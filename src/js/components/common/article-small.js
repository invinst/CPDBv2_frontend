import React, { PropTypes } from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import CloseButtonWrapper from 'components/common/close-btn-wrapper';
import Toggleable from 'components/common/toggleable';
import ResponsiveStyleComponent, { DESKTOP, TABLET } from 'components/responsive/responsive-style-component';
import {
  wrapperStyle, tabletWrapperStyle, contentStyle
} from './article-small.style';


class ArticleSmall extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [TABLET]: {
        wrapper: [wrapperStyle, tabletWrapperStyle, this.props.style],
        content: [contentStyle]
      },
      [DESKTOP]: {
        wrapper: [wrapperStyle, this.props.style],
        content: [contentStyle]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div className='article-small' style={ style.wrapper }>
        <div style={ style.content }>
          <ArticleHeader>{ this.props.header }</ArticleHeader>
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
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  expandDirection: PropTypes.string,
  active: PropTypes.bool
};

ArticleSmall.defaultProps = {
  header: 'FiveThirtyEight',
  content: 'How to predict bad cops in Chicago.'
};

export default Toggleable(Radium(ArticleSmall));
