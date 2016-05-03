import React, {PropTypes} from 'react';
import Radium from 'radium';

import {footerStyle, linkStyle} from 'components/common/article-footer.style';


class ArticleFooter extends React.Component {
  render() {
    return (
      <div style={ footerStyle }>
        <a href={ this.props.href } style={ linkStyle }>
          { this.props.children }
        </a>
      </div>
    );
  }
}

ArticleFooter.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string
};

export default Radium(ArticleFooter);
