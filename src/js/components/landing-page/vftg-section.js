import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import SectionTemplate from 'utils/template/section';
import { SOLID_TEMPLATE } from 'utils/constants';


class VFTGSection extends Component {
  render() {
    const { template, wrapperStyle } = this.props;

    return (
      <div style={ [template.wrapper, wrapperStyle] }>
      </div>
    );
  }
}

VFTGSection.propTypes = {
  template: PropTypes.object,
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

VFTGSection.defaultProps = {
  template: SectionTemplate(SOLID_TEMPLATE),
  wrapperStyle: {}
};

export default ConfiguredRadium(VFTGSection);
