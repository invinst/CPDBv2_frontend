import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEmpty, get } from 'lodash';
import cx from 'classnames';

import SlideMotion from 'components/animation/slide-motion';
import CRPane from 'components/common/preview-pane/panes/cr-pane';
import TRRPane from 'components/common/preview-pane/panes/trr-pane';
import styles from './preview-pane.sass';


export default class PreviewPane extends Component {
  renderPane = () => {
    const { data, type } = this.props;

    const paneTypes = {
      CR: CRPane,
      FORCE: TRRPane,
    };
    const ItemComponent = get(paneTypes, type, null);
    if (ItemComponent)
      return <ItemComponent { ...data } />;
  };

  render() {
    const { data } = this.props;

    return (
      <SlideMotion show={ !isEmpty(data) }>
        <div className={ cx(styles.previewPane, 'geographic-preview-link') }>
          {
            this.renderPane()
          }
        </div>
      </SlideMotion>
    );

  }
}

PreviewPane.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
};

PreviewPane.defaultProps = {
  data: {},
};
