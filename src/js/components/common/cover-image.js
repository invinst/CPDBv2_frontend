import { assign } from 'lodash';
import React, { PropTypes } from 'react';


export default class CoverImage extends React.Component {
  render() {
    let { style, src } = this.props;

    if (src) {
      style = assign({}, style, { background: `url(${src}) center / cover` });
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
