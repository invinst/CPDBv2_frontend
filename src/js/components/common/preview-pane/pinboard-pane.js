import React, { Component, PropTypes } from 'react';

import {
  NewWidgetWrapper,
  TitleWidget,
  ListWidget,
  OneLineListWidget,
} from 'components/common/preview-pane/widgets';
import styles from './pinboard-pane.sass';


export default class PinboardPane extends Component {
  render() {
    const {
      id,
      title,
      fullCreatedAt,
      description,
      officersCount,
      allegationsCount,
      trrsCount,
      recentOfficers,
      recentAllegations,
      recentTrrs,
    } = this.props;

    return (
      <NewWidgetWrapper
        className={ styles.pinboardPane }
        callToAction={ { url: `/pinboard/${id}`, text: 'View Pinboard' } }
        yScrollable={ true }
      >
        <TitleWidget title={ title } subtitle={ description }/>
        <OneLineListWidget
          items={ [
            { title: 'Created at', text: fullCreatedAt },
            { title: 'Pinned Officers', text: officersCount },
            { title: 'Pinned CRs', text: allegationsCount },
            { title: 'Pinned TRRs', text: trrsCount },
          ] }
        />
        <ListWidget
          typeName={ 'allegation' }
          title='Recently pinned officers'
          items={ recentOfficers }
        />
        <ListWidget
          title='Recently pinned allegations'
          items={ recentAllegations }
          showAvatar={ false }
        />
        <ListWidget
          title='Recently pinned TRRs'
          items={ recentTrrs }
          showAvatar={ false }
        />
      </NewWidgetWrapper>
    );
  }
}

PinboardPane.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  fullCreatedAt: PropTypes.string,
  description: PropTypes.string,
  officersCount: PropTypes.number,
  allegationsCount: PropTypes.number,
  trrsCount: PropTypes.number,
  recentOfficers: PropTypes.array,
  recentAllegations: PropTypes.array,
  recentTrrs: PropTypes.array,
};
