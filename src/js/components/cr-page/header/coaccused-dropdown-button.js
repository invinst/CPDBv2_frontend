import React, { Component, PropTypes } from 'react';
import { find } from 'lodash';

import Hoverable from 'components/common/higher-order/hoverable';
import { moreCoaccusedStyle, arrowStyle } from './coaccused-dropdown-button.style';


export class CoaccusedDropdownButton extends Component {
  componentDidUpdate() {
    const { hovering, setParentHovering } = this.props;
    setParentHovering(hovering);
  }

  render() {
    const {
      coaccused, officerId, onClick, displayCoaccusedDropdown,
      hovering, scrollPosition
    } = this.props;

    if (!coaccused || coaccused.length <= 1) {
      return null;
    }

    let coaccusedText;
    const anotherCoaccusedFullname = find(coaccused, obj => obj.id !== officerId).fullName;
    if (coaccused.length === 2) {
      coaccusedText = `Coaccused with ${anotherCoaccusedFullname}`;
    } else {
      coaccusedText = `${anotherCoaccusedFullname} and ${coaccused.length - 2} more coaccused`;
    }

    return (
      <span className='test--coaccused-dropdown-button'
        style={ moreCoaccusedStyle(displayCoaccusedDropdown, hovering, scrollPosition) }
        onClick={ onClick }>
        { coaccusedText }
        <span style={ arrowStyle(displayCoaccusedDropdown, hovering, scrollPosition) }/>
      </span>
    );
  }
}

CoaccusedDropdownButton.propTypes = {
  coaccused: PropTypes.array,
  officerId: PropTypes.number,
  onClick: PropTypes.func,
  displayCoaccusedDropdown: PropTypes.bool,
  hovering: PropTypes.bool,
  scrollPosition: PropTypes.string,
  setParentHovering: PropTypes.func,
};

export default Hoverable(CoaccusedDropdownButton);
