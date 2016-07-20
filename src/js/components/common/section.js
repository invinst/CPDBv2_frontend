import React, { PropTypes, Component } from 'react';
import ConfiguredRadium from 'utils/configured-radium';

import { BASE_TEMPLATE } from 'utils/constants';
import { sectionWrapperStyle, headerStyle, contentStyle } from './section.style';


class Section extends Component {
  constructor(props) {
    super(props);
    this.state = { noHeader: false, wrapperStyle: {} };
  }

  renderHeader() {
    return null;
  }

  renderContent() {
    return null;
  }

  getWrapperStyle() {
    const { template, wrapperStyle } = this.props;

    return [sectionWrapperStyle.base, sectionWrapperStyle[template], this.state.wrapperStyle, wrapperStyle];
  }

  render() {
    const { template } = this.props;

    return (
      <div ref='wrapper' style={ this.getWrapperStyle() }>
        { this.state.noHeader ?
          null :
          <div ref='header' style={ headerStyle[template] }>
            { this.renderHeader() }
          </div>
        }
        <div ref='content' style={ contentStyle[template] }>
          { this.renderContent() }
        </div>
      </div>
    );
  }
}

Section.propTypes = {
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  template: PropTypes.string
};

Section.defaultProps = {
  wrapperStyle: {},
  template: BASE_TEMPLATE
};

export default ConfiguredRadium(Section);
