import React, { PropTypes, Component } from 'react';
import { Motion, spring } from 'react-motion';

import { calculatePosition } from 'utils/dom';
import SlimHeaderContent from './slim-header-content';
import { fixedStyle } from './slim-header.style';


export class SlimHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'top'
    };

    this.recalculatePosition = this.recalculatePosition.bind(this);
  }

  componentDidMount() {
    addEventListener('scroll', this.recalculatePosition);
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.recalculatePosition);
  }

  recalculatePosition() {
    const newPosition = calculatePosition();
    if (newPosition !== this.state.position) {
      this.setState({ position: newPosition });
    }
  }

  render() {
    const { show, pathname } = this.props;
    const { editModeOn } = this.context;

    if (!show) {
      return null;
    }

    const isTop = this.state.position === 'top';
    const isBottom = this.state.position === 'bottom';

    const defaultStyle = {
      translateY: isTop ? 100 : 0,
      backgroundR: isBottom ? 0 : 255,
      backgroundG: isBottom ? 94 : 255,
      backgroundB: isBottom ? 244 : 255,
      height: isBottom ? 102 : 64
    };
    const style = {
      translateY: spring(isTop ? 100 : 0),
      backgroundR: spring(isBottom ? 0 : 255),
      backgroundG: spring(isBottom ? 94 : 255),
      backgroundB: spring(isBottom ? 244 : 255),
      height: spring(isBottom ? 102 : 64)
    };

    return (
      <div>
        <SlimHeaderContent
          className='test--top-slim-header'
          position='top'
          pathname={ pathname }
          editModeOn={ editModeOn }
        />
        <Motion defaultStyle={ defaultStyle } style={ style }>
          { ({ translateY, backgroundR, backgroundG, backgroundB, height }) => {
            const r = Math.round(backgroundR);
            const g = Math.round(backgroundG);
            const b = Math.round(backgroundB);
            return (
              <SlimHeaderContent
                className='test--sticky-slim-header'
                position={ this.state.position }
                pathname={ pathname }
                editModeOn={ editModeOn }
                style={ {
                  transform: `translateY(-${translateY}%)`,
                  backgroundColor: `rgb(${r}, ${g}, ${b})`,
                  height: `${height}px`,
                  ...fixedStyle
                } }
                disableTop={ true }
              />
            );
          } }
        </Motion>
      </div>
    );
  }
}

SlimHeader.propTypes = {
  show: PropTypes.bool,
  pathname: PropTypes.string
};

SlimHeader.defaultProps = {
  show: true
};

SlimHeader.contextTypes = {
  editModeOn: PropTypes.bool
};

export default SlimHeader;
