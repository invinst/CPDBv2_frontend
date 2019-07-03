import React, { Component, PropTypes } from 'react';
import { isEmpty, get } from 'lodash';
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
} from 'components/common/preview-pane';
import styles from './preview-pane.sass';


export default class PreviewPane extends Component {
  constructor(props) {
    super(props);
    this.renderPane = this.renderPane.bind(this);
  }

  renderPane() {
    const { data, type, yScrollable } = this.props;
    const officerPaneFunc = () => <OfficerPane { ...data } yScrollable={ yScrollable }/>;
    const crPaneFunc = () => <CRPane { ...data } yScrollable={ yScrollable } />;
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
    };
    return get(paneTypes, type, () => null)();
  }


  render() {
    const { data, customClass, yScrollable } = this.props;

    return (
      <SlideMotion show={ !isEmpty(data) } offsetX={ 100 }>
        <div className={ cx(styles.previewPaneWrapper, customClass, { [styles.yScrollable]: yScrollable }) }>
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
};

PreviewPane.defaultProps = {
  data: {},
  yScrollable: false,
};
