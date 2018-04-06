import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';
import { imgUrl } from 'utils/static-assets';

import { containerStyle, imgStyle, subTitleStyle, countStyle } from './allegation-count-widget.style';


export default class AllegationCountWidget extends Component {
  render() {
    return (
      <div className='test--allegation-widget' style={ containerStyle }>
        <p style={ countStyle }>{ pluralize('allegation', this.props.numOfAllegations, true) }</p>
        <img src={ imgUrl('disclosure-indicator.svg') } style={ imgStyle }/>
        { this.props.subTitle && (
          <p style={ subTitleStyle }>{this.props.subTitle}</p>
        )}
      </div>
    );
  }
}

AllegationCountWidget.defaultProps = {
  subTitle: null
}

AllegationCountWidget.propTypes = {
  numOfAllegations: PropTypes.number.isRequired,
  subTitle: PropTypes.string
};
