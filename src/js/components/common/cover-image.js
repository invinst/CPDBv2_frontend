import { assign } from 'lodash';
import React, { PropTypes } from 'react';


export default class CoverImage extends React.Component {
  render() {
    let style = this.props.style || {};
    let url = this.props.src;
    if (this.props.src) {
      style = assign(style, { background: `url(${url}) center / cover` });
    }

    return (
      <div style={ style }></div>
    );
  }
}

CoverImage.propTypes = {
  style: PropTypes.object,
  src: PropTypes.string
};
