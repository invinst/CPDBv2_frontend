import React, { Component, PropTypes } from 'react';
import { Range } from 'rc-slider';
import { greyishColor } from 'utils/styles';

import SliderHandle from './handle';
import { wrapperStyle } from './slider.style';


export default class Slider extends Component {
  render() {
    const { value, onChange } = this.props;
    const currentYear = new Date().getYear() + 1900;
    return (
      <div style={ wrapperStyle } className='test--social-graph-slider'>
        <Range
          min={ 2000 }
          max={ currentYear }
          defaultValue={ [2000, currentYear] }
          onChange={ onChange }
          value={ value }
          trackStyle={ [{ visibility: 'hidden' }] }
          railStyle={ { backgroundColor: greyishColor, height: '1px' } }
          handle={ props => <SliderHandle { ...props } key={ props.index }/> }
          pushable={ true }
        />
      </div>
    );
  }
}

Slider.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func
};
