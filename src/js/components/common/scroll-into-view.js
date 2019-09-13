import React, { PropTypes, Component } from 'react';
import { isEmpty, get } from 'lodash';


export default class ScrollIntoView extends Component {
  componentDidUpdate() {
    this.scrollIntoView();
  }

  scrollIntoView() {
    const { scrollOptions, focusedItemClassName } = this.props;
    const element = get(document.getElementsByClassName(focusedItemClassName), '0', null);

    if (!isEmpty(element)) {
      element.scrollIntoView(scrollOptions);
    }
  }

  render() {
    const { children } = this.props;

    return <div>{ children }</div>;
  }
}

ScrollIntoView.propTypes = {
  children: PropTypes.node,
  focusedItemClassName: PropTypes.string,
  scrollOptions: PropTypes.object,
};

ScrollIntoView.defaultProps = {
  scrollOptions: {
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  },
};
