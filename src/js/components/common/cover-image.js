import PropTypes from 'prop-types';
import React from 'react';

import ConfiguredRadium from 'utils/configured-radium';


function CoverImage(props) {
  let { style, src } = props;

  if (src) {
    style = [style, { background: `url(${src}) center / cover` }];
  }

  return (
    <div style={ style } />
  );
}

CoverImage.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  src: PropTypes.string,
};

export default ConfiguredRadium(CoverImage);
