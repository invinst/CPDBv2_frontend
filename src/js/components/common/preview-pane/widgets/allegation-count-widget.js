import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';
import { imgUrl } from 'utils/static-assets';

import OutboundLink from 'components/common/outbound-link';
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
        <OutboundLink href={ url } style={ linkStyle }>
          <p style={ countStyle }>
            { `${numOfAllegations.toLocaleString()} ${pluralize('allegation', numOfAllegations)}` }
          </p>
          <img src={ imgUrl('disclosure-indicator.svg') } style={ imgStyle }/>
          { subTitle && <p style={ subTitleStyle }>{ subTitle }</p> }
        </OutboundLink>
      </div>
    );
  }
}

AllegationCountWidget.defaultProps = {
  subTitle: null,
  url: '#',
  numOfAllegations: 0,
};

AllegationCountWidget.propTypes = {
  numOfAllegations: PropTypes.number.isRequired,
  subTitle: PropTypes.string,
  url: PropTypes.string,
};
