import React, { Component, PropTypes } from 'react';

import SummaryPanel from './summary-panel';
import CommunityMap from './community-map';
import { wrapperStyle } from './heat-map.style';


export default class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: 0
    };
    this.setSelectedCommunity = this.setSelectedCommunity.bind(this);
  }

  componentDidMount() {
    this.props.getCommunities();
  }

  setSelectedCommunity(id) {
    this.setState({
      selectedId: id
    });
  }

  render() {
    const { selectedId } = this.state;
    const { communities, communityGeoJSON } = this.props;

    return (
      <div style={ wrapperStyle }>
        <CommunityMap
          communitySource={ communityGeoJSON }
          selectCommunity={ this.setSelectedCommunity }
          communityId={ selectedId }
        />
        <SummaryPanel
          communities={ communities }
          communityId={ selectedId }
          selectCommunity={ this.setSelectedCommunity }
        />
      </div>
    );
  }
}

HeatMap.propTypes = {
  communities: PropTypes.array,
  communityGeoJSON: PropTypes.object,
  getCommunities: PropTypes.func
};

HeatMap.defaultProps = {
  getCommunities: () => {}
};
