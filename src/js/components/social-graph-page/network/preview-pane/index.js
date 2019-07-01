import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import cx from 'classnames';

import { NETWORK_PREVIEW_PANE } from 'utils/constants';
import OfficerPane from 'components/common/preview-pane/officer-pane';
import styles from './preview-pane.sass';
import EdgeCoaccusalsPane from './edge-coaccusals-pane';


export default class PreviewPane extends Component {
  render() {
    const { data, type, location, onTrackingAttachment } = this.props;

    const paneTypes = {
      [NETWORK_PREVIEW_PANE.OFFICER]: {
        component: OfficerPane,
        customClassName: 'officer-preview-pane officer-preview-link',
      },
      [NETWORK_PREVIEW_PANE.EDGE_COACCUSALS]: {
        component: EdgeCoaccusalsPane,
        customClassName: 'edge-coaccusals-preview-link',
        hasTracking: true
      }
    };

    const itemComponent = get(paneTypes, type, {});
    const ItemComponent = itemComponent.component;

    let itemData = data;
    if (itemComponent.hasTracking) {
      itemData = { ...data, location, onTrackingAttachment };
    }

    return (
      <div className={ cx(styles.previewPane, itemComponent.customClassName) }>
        {
          ItemComponent && <ItemComponent { ...itemData } />
        }
      </div>
    );
  }
}

PreviewPane.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
  location: PropTypes.object,
  onTrackingAttachment: PropTypes.func,
};

PreviewPane.defaultProps = {
  data: {},
};
