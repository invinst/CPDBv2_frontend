import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import cx from 'classnames';

import SlideMotion from 'components/animation/slide-motion';
import OfficerPane from 'components/common/preview-pane/officer-pane';
import styles from './preview-pane.sass';


export default class PreviewPane extends Component {
  render() {
    const { data } = this.props;

    return (
      <SlideMotion show={ !isEmpty(data) } offsetX={ 100 }>
        <div className={ cx(styles.previewPane, 'officer-preview-link', 'test--preview-pane') }>
          <OfficerPane { ...data }/>
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
