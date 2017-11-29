import React, { Component, PropTypes } from 'react';
import ShortList from 'components/common/short-list';
import { wrapperStyle, titleStyle, visualTokenStyle } from './preview-pane.style.js';
import { getSvgUrl } from 'utils/visual-token';


export default class PreviewPane extends Component {
  render() {
    const { data, backgroundColor, officerId, title } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div className='test--preview-pane-title' style={ titleStyle }>{ title }</div>
        <img
          className='test--previiew-pane-visual-token'
          style={ { ...visualTokenStyle, backgroundColor } }
          src={ getSvgUrl(officerId) }
        />
        <ShortList data={ data }/>
      </div>
    );

  }
}

PreviewPane.propTypes = {
  officerId: PropTypes.string,
  backgroundColor: PropTypes.string,
  data: PropTypes.array,
  title: PropTypes.string
};
