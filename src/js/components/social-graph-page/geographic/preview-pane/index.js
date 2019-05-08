import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import cx from 'classnames';

import SlideMotion from 'components/animation/slide-motion';
import CRPane from 'components/common/preview-pane';
import styles from './preview-pane.sass';


export default class PreviewPane extends Component {
  render() {
    const { data } = this.props;

    return (
      <SlideMotion show={ !isEmpty(data) } offsetX={ 100 }>
        <div className={ cx(styles.previewPane, 'test--preview-pane', 'geographic-preview-link') }>
          <CRPane { ...data }/>
        </div>
      </SlideMotion>
    );

  }
}

PreviewPane.propTypes = {
  data: PropTypes.object,
};

PreviewPane.defaultProps = {
  data: {},
};
