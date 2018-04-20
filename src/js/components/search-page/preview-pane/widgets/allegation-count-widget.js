import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';
import { imgUrl } from 'utils/static-assets';

import {
  containerStyle,
  imgStyle,
  subTitleStyle,
  countStyle,
  linkStyle,
} from './allegation-count-widget.style';


export default class AllegationCountWidget extends Component {
  render() {
    const { numOfAllegations, subTitle, url } = this.props;
    return (
      <div className='test--allegation-widget' style={ containerStyle }>
        <a href={ url } style={ linkStyle }>
          <p style={ countStyle }>{ pluralize('allegation', numOfAllegations, true) }</p>
          <img src={ imgUrl('disclosure-indicator.svg') } style={ imgStyle }/>
          { subTitle && <p style={ subTitleStyle }>{ subTitle }</p> }
        </a>
      </div>
    );
  }
}

AllegationCountWidget.defaultProps = {
  subTitle: null,
  url: '#',
};

AllegationCountWidget.propTypes = {
  numOfAllegations: PropTypes.number.isRequired,
  subTitle: PropTypes.string,
  url: PropTypes.string,
};
