import React, { Component, PropTypes } from 'react';
import { isEmpty, get } from 'lodash';
import cx from 'classnames';

import SlideMotion from 'components/animation/slide-motion';
import CRPane from 'components/common/preview-pane/cr-pane';
import TRRPane from 'components/common/preview-pane/trr-pane';
import styles from './preview-pane.sass';


export default class PreviewPane extends Component {
  constructor(props) {
    super(props);

    this.renderPane = this.renderPane.bind(this);
  }

  renderPane() {
    const { data, type } = this.props;

    const paneTypes = {
      CR: CRPane,
      FORCE: TRRPane,
    };
    const ItemComponent = get(paneTypes, type, null);
    if (ItemComponent)
      return <ItemComponent { ...data } />;
  }

  render() {
    const { data } = this.props;

    return (
      <SlideMotion show={ !isEmpty(data) } offsetX={ 100 }>
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
