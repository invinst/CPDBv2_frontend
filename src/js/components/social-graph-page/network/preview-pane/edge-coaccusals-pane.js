import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import pluralize from 'pluralize';

import style from './edge-coaccusals-pane.sass';
import Item from 'components/social-graph-page/network/right-pane-section/timeline/item/index';
import { imgUrl } from 'utils/static-assets';


export default class EdgeCoaccusalsPane extends Component {
  render() {
    const {
      items,
      pathname,
      onTrackingAttachment,
      info,
      updateSelectedCrid,
    } = this.props;
    return (
      <div className={ style.edgeCoaccusalsPane }>
        <div className='edge-coaccusals-pane-header'>
          { `${info.sourceOfficerName} & ${info.targetOfficerName}'s ` }
          { `${info.coaccusedCount} ${pluralize('coaccusal', info.coaccusedCount)}` }
        </div>
        { isEmpty(items) && (<img className='loading-img' src={ imgUrl('loading.svg') } />) }
        {
          items.map((item) => {
            return (
              <Item
                item={ item }
                key={ item.key }
                pathname={ pathname }
                onTrackingAttachment={ onTrackingAttachment }
                updateSelectedCrid={ updateSelectedCrid }
              />
            );
          })
        }
      </div>
    );
  }
}

EdgeCoaccusalsPane.propTypes = {
  items: PropTypes.array,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
  updateSelectedCrid: PropTypes.func,
  info: PropTypes.object,
};

EdgeCoaccusalsPane.defaultProps = {
  items: [],
  info: {},
};
