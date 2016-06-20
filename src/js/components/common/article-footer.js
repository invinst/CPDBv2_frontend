import React, { PropTypes } from 'react';
import Radium from 'radium';

import { footerStyle, linkStyle } from './article-footer.style';


class ArticleFooter extends React.Component {
  render() {
    const { style, className, href, children } = this.props;
    return (
      <div style={ [footerStyle, style.wrapper] } className={ className }>
        <a style={ linkStyle } href={ href }>
          { children }
        </a>
      </div>
    );
  }
}

ArticleFooter.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({
    wrapper: PropTypes.object
  })
};

ArticleFooter.defaultProps = {
  style: {}
};

export default Radium(ArticleFooter);
