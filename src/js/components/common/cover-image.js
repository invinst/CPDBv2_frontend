import { assign } from 'lodash';
import React, { PropTypes } from 'react';


export default class CoverImage extends React.Component {
  render() {
    let url = this.props.src;
    let style = assign({},
      this.props.style, { background: `url(${url}) center / cover` }
    );
    return (
      <div style={ style }></div>
    );
  }
}

CoverImage.propTypes = {
  style: PropTypes.object,
  src: PropTypes.string
};
