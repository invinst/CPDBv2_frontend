import React, { Component, PropTypes } from 'react';
import { get, pick, merge } from 'lodash';
import cx from 'classnames';

import { NETWORK_PREVIEW_PANE } from 'utils/constants';
import OfficerPane from 'components/common/preview-pane/panes/officer-pane';
import EdgeCoaccusalsPane from './edge-coaccusals-pane';
import CRPane from 'components/common/preview-pane/panes/cr-pane';
import styles from './preview-pane.sass';


export default class PreviewPane extends Component {
  render() {
    const { data, type } = this.props;

    const paneTypes = {
      [NETWORK_PREVIEW_PANE.OFFICER]: {
        component: OfficerPane,
        customClassName: 'officer-preview-link',
        defaultProps: { pinnable: false, yScrollable: true },
      },
      [NETWORK_PREVIEW_PANE.EDGE_COACCUSALS]: {
        component: EdgeCoaccusalsPane,
        customClassName: 'edge-coaccusals-preview-link',
        customProps: ['location', 'onTrackingAttachment', 'updateSelectedCrid'],
      },
      [NETWORK_PREVIEW_PANE.CR]: {
        component: CRPane,
        customClassName: 'cr-preview-pane cr-preview-link',
        defaultProps: { yScrollable: true },
      },
    };

    const itemComponent = get(paneTypes, type, {});
    const ItemComponent = itemComponent.component;

    const itemData = merge(pick(this.props, itemComponent.customProps), data);

    return (
      <div className={ cx(styles.previewPane, itemComponent.customClassName) }>
        {
          ItemComponent && <ItemComponent { ...itemData } { ...itemComponent.defaultProps } />
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
