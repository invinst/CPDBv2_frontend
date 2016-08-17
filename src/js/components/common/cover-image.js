import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';


class CoverImage extends React.Component {
  render() {
    let { style, src } = this.props;

    if (src) {
      style = [style, { background: `url(${src}) center / cover` }];
    }

    return (
      <div style={ style }></div>
    );
  }
}

CoverImage.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  src: PropTypes.string
};

export default ConfiguredRadium(CoverImage);
