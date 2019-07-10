import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import cx from 'classnames';

import { NETWORK_PREVIEW_PANE } from 'utils/constants';
import OfficerPane from 'components/common/preview-pane/officer-pane';
import EdgeCoaccusalsPane from './edge-coaccusals-pane';
import CRPane from 'components/common/preview-pane/cr-pane';
import styles from './preview-pane.sass';


export default class PreviewPane extends Component {
  render() {
    const { data, type } = this.props;

    const paneTypes = {
      [NETWORK_PREVIEW_PANE.OFFICER]: {
        component: OfficerPane,
        customClassName: 'officer-preview-pane officer-preview-link',
      },
      [NETWORK_PREVIEW_PANE.EDGE_COACCUSALS]: {
        component: EdgeCoaccusalsPane,
        customClassName: 'edge-coaccusals-preview-link',
        customProps: ['location', 'onTrackingAttachment', 'updateSelectedCrid']
      },
      [NETWORK_PREVIEW_PANE.CR]: {
        component: CRPane,
        customClassName: 'cr-preview-pane cr-preview-link',
      },
    };

    const itemComponent = get(paneTypes, type, {});
    const ItemComponent = itemComponent.component;

    let itemData = data;
    if (itemComponent.customProps) {
      itemComponent.customProps.forEach((propName) => {
        itemData[propName] = this.props[propName];
      });
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
  updateSelectedCrid: PropTypes.func,
};

PreviewPane.defaultProps = {
  data: {},
};
