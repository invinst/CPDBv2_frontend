import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import ConfiguredRadium from 'utils/configured-radium';


class Paragraphs extends Component {
  render() {
    const { children, style } = this.props;

    return (
      <div style={ style.wrapper }>
        {
          map(children, (child, index) => (
            <p key={ index } style={ style.paragraph }>
              { child }
            </p>
            ))
        }
      </div>
    );
  }
}

Paragraphs.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

export default ConfiguredRadium(Paragraphs);
