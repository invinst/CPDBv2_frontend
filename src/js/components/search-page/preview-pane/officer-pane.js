import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { titleStyle, visualTokenStyle } from './officer-pane.style';
import ShortList from 'components/common/short-list';
import { CallToActionWidget } from './widgets';


export default class OfficerPane extends Component {
  render() {
    const { to, visualTokenBackgroundColor, visualTokenImg, title, officerInfo } = this.props;
    const convertedData = map(officerInfo, (value, key) => [key, value]);
    return (
      <div>
        <div className='test--preview-pane-title' style={ titleStyle }>{ title }</div>
        {
          visualTokenImg ?
            <img
              className='test--preview-pane-visual-token'
              style={ { ...visualTokenStyle, backgroundColor: visualTokenBackgroundColor } }
              src={ visualTokenImg }
            /> :
            null
        }
        <ShortList data={ convertedData }/>
        <CallToActionWidget text='View Officer Profile' url={ to }/>
      </div>
    );
  }
}

OfficerPane.propTypes = {
  visualTokenImg: PropTypes.string,
  visualTokenBackgroundColor: PropTypes.string,
  officerInfo: PropTypes.object.isRequired,
  title: PropTypes.string,
  to: PropTypes.string
};
