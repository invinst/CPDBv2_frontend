import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEmpty, get, noop } from 'lodash';
import cx from 'classnames';

import SlideMotion from 'components/animation/slide-motion';
import {
  OfficerPane,
  CommunityPane,
  NeighborhoodPane,
  WardPane,
  PoliceBeatPane,
  PoliceDistrictPane,
  SchoolGroundPane,
  RankPane,
  SearchTermItemPane,
  CRPane,
  TRRPane,
  PinboardPane,
} from 'components/common/preview-pane/panes';
import styles from './preview-pane.sass';
import withOverlay from 'components/common/with-overlay';


export default class PreviewPane extends Component {
  renderPane = () => {
    const { data, type, yScrollable, addOrRemoveItemInPinboard } = this.props;
    const officerPaneFunc = () => <OfficerPane { ...data }
      yScrollable={ yScrollable }
      type={ type }
      addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
    />;
    const crPaneFunc = () => <CRPane { ...data } yScrollable={ yScrollable }/>;
    const trrPaneFunc = () => {
      return (
        <div className='trr-pane-wrapper'>
          <TRRPane { ...data } yScrollable={ yScrollable } />
        </div>
      );
    };

    const paneTypes = {
      'SEARCH-TERMS': () => <SearchTermItemPane { ...data } />,
      OFFICER: officerPaneFunc,
      'DATE > OFFICERS': officerPaneFunc,
      'UNIT > OFFICERS': officerPaneFunc,
      COMMUNITY: () => <CommunityPane { ...data } />,
      NEIGHBORHOOD: () => <NeighborhoodPane { ...data } />,
      WARD: () => <WardPane { ...data }/>,
      BEAT: () => <PoliceBeatPane { ...data } />,
      'POLICE-DISTRICT': () => <PoliceDistrictPane { ...data } />,
      'SCHOOL-GROUND': () => <SchoolGroundPane { ...data } />,
      RANK: () => <RankPane { ...data } />,
      CR: crPaneFunc,
      'DATE > CR': crPaneFunc,
      'INVESTIGATOR > CR': crPaneFunc,
      TRR: trrPaneFunc,
      'DATE > TRR': trrPaneFunc,
      'PINBOARD': () => <PinboardPane { ...data } { ...this.props }/>,
    };
    return get(paneTypes, type, () => null)();
  };


  render() {
    const { data, customClass, yScrollable, dynamicHeight, isShown } = this.props;

    return (
      <SlideMotion show={ isShown && !isEmpty(data) }>
        <div className={
          cx(
            styles.previewPaneWrapper,
            customClass,
            { [styles.yScrollable]: yScrollable, 'dynamic-height': dynamicHeight }
          )
        }>
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
  customClass: PropTypes.string,
  yScrollable: PropTypes.bool,
  dynamicHeight: PropTypes.bool,
  addOrRemoveItemInPinboard: PropTypes.func,
  fetchPinboardStaticSocialGraph: PropTypes.func,
  isShown: PropTypes.bool,
};

PreviewPane.defaultProps = {
  data: {},
  yScrollable: false,
  addOrRemoveItemInPinboard: noop,
  fetchPinboardStaticSocialGraph: noop,
  dynamicHeight: false,
  isShown: true,
};

export const PreviewPaneWithOverlay = withOverlay(PreviewPane);
