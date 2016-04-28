import React, {PropTypes} from 'react';
import Radium from 'radium';

import { paragraphStyle } from 'components/common/paragraph.style';


class Paragraph extends React.Component {
  render() {
    return (<p style={ paragraphStyle }>
      { this.props.children }
    </p>);
  }
}

Paragraph.propTypes = {
  children: PropTypes.node
};

export default Radium(Paragraph);
