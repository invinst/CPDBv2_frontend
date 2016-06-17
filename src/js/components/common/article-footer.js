import React, { PropTypes } from 'react';
import Radium from 'radium';
import Link from 'components/common/react-router-link';

import { footerStyle, linkStyle } from './article-footer.style';


class ArticleFooter extends React.Component {
  render() {
    const { style, className, href, children } = this.props;
    return (
      <div style={ [footerStyle, style.wrapper] } className={ className }>
        <Link className='link--transition' to={ href } style={ [linkStyle, style.link] }>
          { children }
        </Link>
      </div>
    );
  }
}

ArticleFooter.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({
    wrapper: PropTypes.object,
    link: PropTypes.object
  })
};

ArticleFooter.defaultProps = {
  style: {},
  href: '#'
};

export default Radium(ArticleFooter);
