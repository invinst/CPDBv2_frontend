import React, { PropTypes, Component } from 'react';


export default class Scroller extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollTop !== this.props.scrollTop) {
      this.element.scrollTop = nextProps.scrollTop;
    }
  }

  handleElementRef(el) {
    if (el) {
      this.element = el;
      this.props.onElementRef(el);
    }
  }

  render() {
    const { style, children } = this.props;
    return (
      <div className='test--timeline-items-container'
        style={ { overflow: 'auto', ...style } } ref={ this.handleElementRef.bind(this) }>
      { children }
      </div>
    );
  }
}

Scroller.propTypes = {
  scrollTop: PropTypes.number,
  style: PropTypes.object,
  onElementRef: PropTypes.func,
  children: PropTypes.node
};

Scroller.defaultProps = {
  onElementRef: () => {}
};
