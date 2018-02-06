import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import MasonryLayout from 'components/common/masonry-layout';
import ReportGroup from './report-group';
import { masonrySizes } from './group-types';
import ReportAddButton from './report-add-button';
import { wrapperStyle, borderSleeveStyle } from './reports-masonry.style';


export default class ReportsMasonry extends Component {
  componentDidMount() {
    const { reportGroups, loadMore } = this.props;
    if (isEmpty(reportGroups)) {
      loadMore();
    }
  }

  render() {
    const { hasMore, loadMore, reportGroups, onReportClick, nextParams, onAddReportClick, editModeOn } = this.props;

    let reportElements = [];
    if (editModeOn) {
      reportElements = [<ReportAddButton key='add' onClick={ onAddReportClick }/>];
    }
    reportElements = reportElements.concat(
      reportGroups.map(group => (
        <ReportGroup
          key={ group.key }
          onReportClick={ onReportClick }
          { ...group }/>
      ))
    );

    return (
      <div>
        <div style={ borderSleeveStyle }/>
        <div style={ wrapperStyle }>
          <InfiniteScroll
            loadMore={ () => loadMore(nextParams) }
            hasMore={ hasMore }>
            <MasonryLayout
              sizes={ masonrySizes }>
              { reportElements }
            </MasonryLayout>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

ReportsMasonry.propTypes = {
  hasMore: PropTypes.bool,
  loadMore: PropTypes.func,
  reportGroups: PropTypes.array,
  onReportClick: PropTypes.func,
  onAddReportClick: PropTypes.func,
  editModeOn: PropTypes.bool,
  nextParams: PropTypes.object
};

ReportsMasonry.defaultProps = {
  reportGroups: [],
  loadMore: () => {}
};
