import React, { PropTypes, Component } from 'react';
import { Bricks } from 'utils/wrapper';


export default class MasonryLayout extends Component {
  componentDidMount() {
    const { packed, sizes, children, position } = this.props;

    this.instance = Bricks({
      container: this.masonryContainer,
      packed: packed,
      sizes: sizes,
      position: position,
    });

    this.instance.resize(true);

    if (children.length > 0) {
      this.instance.pack();
    }
  }

  componentDidUpdate(prevProps) {
    const { children } = this.props;

    if (prevProps.children.length === 0 && children.length === 0) {
      return;
    }

    if (prevProps.children.length === 0 && children.length > 0) {
      return this.instance.pack();
    }

    if (prevProps.children[0].key !== children[0].key) {
      return this.instance.pack();
    }

    if (prevProps.children.length !== children.length) {
      return this.instance.update();
    }
  }

  componentWillUnmount() {
    this.instance.resize(false);
  }

  render() {
    const { className, style, children } = this.props;
    return (
      <div
        ref={ component => this.masonryContainer = component }
        className={ className }
        style={ style }>
        { children }
      </div>
    );
  }
}

MasonryLayout.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  sizes: PropTypes.array,
  packed: PropTypes.string,
  position: PropTypes.bool,
};

MasonryLayout.defaultProps = {
  className: '',
  packed: 'data-packed',
  position: true,
  sizes: [
    { columns: 1, gutter: 20 },
    { mq: '768px', columns: 2, gutter: 20 },
    { mq: '1024px', columns: 3, gutter: 20 },
  ],
  style: {},
};
