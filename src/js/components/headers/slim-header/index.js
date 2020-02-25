import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { calculateSlimHeaderPosition } from 'utils/dom';
import SlimHeaderContent from './slim-header-content';
import { EditModeContext } from 'contexts';


export class SlimHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'top',
    };
  }

  componentDidMount() {
    addEventListener('scroll', this.recalculatePosition);
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.recalculatePosition);
  }

  recalculatePosition = () => {
    const newPosition = calculateSlimHeaderPosition();
    if (newPosition !== this.state.position) {
      this.setState({ position: newPosition });
    }
  };

  render() {
    const { show, pathname } = this.props;
    const { editModeOn } = this.context;
    const { position } = this.state;

    if (!show) {
      return null;
    }

    return (
      <SlimHeaderContent
        position={ position }
        pathname={ pathname }
        editModeOn={ editModeOn }
      />
    );
  }
}

SlimHeader.contextType = EditModeContext;

SlimHeader.propTypes = {
  show: PropTypes.bool,
  pathname: PropTypes.string,
};

SlimHeader.defaultProps = {
  show: true,
};

export default SlimHeader;
