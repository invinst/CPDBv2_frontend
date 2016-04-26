import _ from 'lodash';
import React, {PropTypes} from 'react';


export default class FeaturedStoryImage extends React.Component {
  render() {
    let url = this.props.src;
    let style = _.assign({},
      this.props.style, { background: `url(${url}) center / cover` }
    );
    return (
      <div style={ style }></div>
    );
  }
}

FeaturedStoryImage.propTypes = {
  style: PropTypes.object,
  src: PropTypes.string
};
