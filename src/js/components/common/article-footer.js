import React, { PropTypes } from 'react';

import Link from 'components/common/react-router-link';
import ConfiguredRadium from 'utils/configured-radium';
import { footerStyle, linkStyle } from './article-footer.style';


class ArticleFooter extends React.Component {
  renderLink() {
    const { style, href, children, onClick, to } = this.props;

    if (to) {
      return (
        <Link className='footer__link link--transition' to={ to }
          style={ [linkStyle, style.link] } onClick={ onClick }>
          { children }
        </Link>
      );
    }

    return (
      <a className='link--transition' href={ href }
        style={ [linkStyle, style.link] } onClick={ onClick }>
        { children }
      </a>
    );
  }

  render() {
    const { style, className } = this.props;
    return (
      <div style={ [footerStyle, style.wrapper] } className={ className }>
        { this.renderLink() }
      </div>
    );
  }
}

ArticleFooter.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({
    wrapper: PropTypes.object,
    link: PropTypes.object
  }),
  onClick: PropTypes.func
};

ArticleFooter.defaultProps = {
  style: {},
  href: '#'
};

export default ConfiguredRadium(ArticleFooter);
