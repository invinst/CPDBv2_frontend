import React, {PropTypes} from 'react';
import Radium from 'radium';

import { titleStyle } from 'components/common/article-title.style';


class ArticleTitle extends React.Component {
  render() {
    return (<p style={ titleStyle }>
      { this.props.children }
    </p>);
  }
}

ArticleTitle.propTypes = {
  children: PropTypes.node
};

export default Radium(ArticleTitle);
