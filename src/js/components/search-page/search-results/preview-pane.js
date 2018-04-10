import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import SlideMotion from 'components/animation/slide-motion';

import OfficerPane from 'components/search-page/preview-pane/officer-pane';
import CommunityPane from 'components/search-page/preview-pane/community-pane';

import { wrapperStyle } from './preview-pane.style';


export default class PreviewPane extends Component {
  constructor(props) {
    super(props);
    this.renderPane = this.renderPane.bind(this);
  }

  renderPane() {
    const { data, type } = this.props;

    switch (type) {
      case 'OFFICER':
        return <OfficerPane { ...data }/>;
      case 'COMMUNITY':
        return <CommunityPane { ...data } />;
      default:
        return null;
    }
  }

  render() {
    const { data } = this.props;

    return (
      <SlideMotion show={ !isEmpty(data) } offsetX={ 100 }>
        <div className='test--preview-pane' style={ wrapperStyle }>
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
  type: PropTypes.string
};

PreviewPane.defaultProps = {
  data: {},
};
