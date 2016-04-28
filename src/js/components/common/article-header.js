import React, {PropTypes} from 'react';
import Radium from 'radium';

import { articleHeaderStyle } from 'components/common/article-header.style';


class ArticleHeader extends React.Component {
  render() {
    return (<h6 style={ articleHeaderStyle }>
      { this.props.children }
    </h6>);
  }
}

ArticleHeader.propTypes = {
  children: PropTypes.node
};

export default Radium(ArticleHeader);
