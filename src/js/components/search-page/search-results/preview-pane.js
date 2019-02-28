import React, { Component, PropTypes } from 'react';
import { isEmpty, get } from 'lodash';

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
  CRPane
} from 'components/search-page/preview-pane';
import { wrapperStyle } from './preview-pane.style';


export default class PreviewPane extends Component {
  constructor(props) {
    super(props);
    this.renderPane = this.renderPane.bind(this);
  }

  renderPane() {
    const { data, type } = this.props;
    const officerPaneFunc = () => <OfficerPane { ...data }/>;
    const crPaneFunc = () => <CRPane { ...data }/>;

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
    };
    return get(paneTypes, type, () => null)();
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
