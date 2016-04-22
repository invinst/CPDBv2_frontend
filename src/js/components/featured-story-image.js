import _ from 'lodash';
import React, {PropTypes} from 'react';


export default class FeaturedStoryImage extends React.Component {
  render() {
    let style = _.assign({},
      this.props.style, { background: 'url('+ this.props.src +') center / cover' }
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
