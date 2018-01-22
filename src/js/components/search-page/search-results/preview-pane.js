import React, { Component, PropTypes } from 'react';
import ShortList from 'components/common/short-list';
import { wrapperStyle, titleStyle, visualTokenStyle } from './preview-pane.style.js';
import { isEmpty } from 'lodash';
import SlideMotion from 'components/animation/slide-motion';


export default class PreviewPane extends Component {
  render() {
    const { data, visualTokenBackgroundColor, visualTokenImg, title } = this.props;

    return (
      <SlideMotion show={ !isEmpty(data) } translateX={ 100 }>
        <div style={ wrapperStyle }>
          <div className='test--preview-pane-title' style={ titleStyle }>{ title }</div>
          {
            visualTokenImg ?
              <img
                className='test--previiew-pane-visual-token'
                style={ { ...visualTokenStyle, backgroundColor: visualTokenBackgroundColor } }
                src={ visualTokenImg }
              /> :
              null
          }
          <ShortList data={ data }/>
        </div>
      </SlideMotion>
    );

  }
}

PreviewPane.propTypes = {
  visualTokenImg: PropTypes.string,
  visualTokenBackgroundColor: PropTypes.string,
  data: PropTypes.array,
  title: PropTypes.string
};

PreviewPane.defaultProps = {
  data: [],
};
