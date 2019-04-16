import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import PinnedSection from './pinned-section';


export default class PinboardPage extends Component {
  componentDidUpdate(prevProps) {
    const prevID = prevProps.pinboard.id;
    const currID = this.props.pinboard.id;

    if (prevID !== currID) {
      browserHistory.replace(`/pinboard/${currID}/`);
    }
  }

  render() {
    const { itemsByTypes, removeItemInPinboardPage } = this.props;
    return (
      <div className={ responsiveContainerStyles.responsiveContainer }>
        <Link to='/search/'>Back to search page</Link>
        <PinnedSection
          itemsByTypes={ itemsByTypes }
          removeItemInPinboardPage={ removeItemInPinboardPage }/>
      </div>
    );
  }
}

PinboardPage.propTypes = {
  pinboard: PropTypes.object,
  itemsByTypes: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
};

PinboardPage.defaultProps = {
  itemsByTypes: {},
};
