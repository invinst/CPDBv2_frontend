import PropTypes from 'prop-types';
import React, { Component } from 'react';
import pluralize from 'pluralize';
import { includes, isNil } from 'lodash';

import {
  NewWidgetWrapper,
  TitleWidget,
  ListWidget,
  OneLineListWidget,
} from '../widgets';
import styles from './pinboard-pane.sass';
import StaticSocialGraphContainer from 'containers/pinboard-admin-page/static-social-graph-container';
import { generatePinboardUrl } from 'utils/pinboard';


export default class PinboardPane extends Component {
  componentDidMount() {
    this.performFetchPinboardStaticSocialGraph();
  }

  componentDidUpdate() {
    this.performFetchPinboardStaticSocialGraph();
  }

  performFetchPinboardStaticSocialGraph() {
    const { id, fetchPinboardStaticSocialGraph, cachedDataIDs } = this.props;
    !isNil(id) && !includes(cachedDataIDs, id) && fetchPinboardStaticSocialGraph(id);
  }

  render() {
    const {
      id,
      title,
      fullCreatedAt,
      description,
      officersCount,
      allegationsCount,
      trrsCount,
      childCount,
      recentOfficers,
      recentAllegations,
      recentTrrs,
    } = this.props;

    return (
      <NewWidgetWrapper
        className={ styles.pinboardPane }
        callToAction={ { to: generatePinboardUrl({ id, title }), text: 'View Pinboard' } }
        yScrollable={ true }
        isClickable={ false }
      >
        <TitleWidget title={ title } subtitle={ description }/>
        <OneLineListWidget
          items={ [
            { title: 'Created at', text: fullCreatedAt },
            { title: 'Children', text: String(childCount) },
          ] }
        />
        <div className='static-social-graph'>
          <StaticSocialGraphContainer key={ id } pinboardId={ id } className='social-graph'/>
        </div>

        <ListWidget
          key={ `pinboard-${id}-officer` }
          title={ pluralize('Pinned officer', officersCount, true) }
          items={ recentOfficers }
          expandable={ true }
          collapsible={ true }
        />
        <ListWidget
          key={ `pinboard-${id}-allegation` }
          title={ pluralize('Pinned allegation', allegationsCount, true) }
          items={ recentAllegations }
          showAvatar={ false }
          expandable={ true }
          collapsible={ true }
        />
        <ListWidget
          key={ `pinboard-${id}-trr` }
          title={ pluralize('Pinned TRR', trrsCount, true) }
          items={ recentTrrs }
          showAvatar={ false }
          expandable={ true }
          collapsible={ true }
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
  childCount: PropTypes.number,
  recentOfficers: PropTypes.array,
  recentAllegations: PropTypes.array,
  recentTrrs: PropTypes.array,
  fetchPinboardStaticSocialGraph: PropTypes.func,
  cachedDataIDs: PropTypes.array,
};

PinboardPane.defaultProps = {
  fetchPinboardStaticSocialGraph: () => {},
  description: '',
};
