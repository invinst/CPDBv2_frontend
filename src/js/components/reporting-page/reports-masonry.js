import React, { Component, PropTypes } from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import { isEmpty } from 'lodash';

import PropsRerender from 'components/common/higher-order/props-rerender';
import ReportGroup from './report-group';
import { masonrySizes } from './group-types';
import ReportAddButton from './report-add-button';
import { wrapperStyle, borderSleeveStyle } from './reports-masonry.style';


class ReportsMasonry extends Component {
  componentDidMount() {
    const { reportGroups, loadMore } = this.props;
    if (isEmpty(reportGroups)) {
      loadMore();
    }
  }

  render() {
    const {
      hasMore, loadMore, reportGroups, onReportClick, nextParams, onAddReportClick
    } = this.props;
    const { editModeOn } = this.context;

    let addButtonArray = [];
    if (editModeOn) {
      addButtonArray = [<ReportAddButton key='add' onClick={ onAddReportClick }/>];
    }

    return (
      <div>
        <div style={ borderSleeveStyle }/>
        <div style={ wrapperStyle }>
          <MasonryInfiniteScroller
            hasMore={ hasMore }
            loadMore={ () => loadMore(nextParams) }
            sizes={ masonrySizes }>
            {
              addButtonArray.concat(
                reportGroups.map(group => (
                  <ReportGroup
                    key={ group.key }
                    onReportClick={ onReportClick }
                    { ...group }/>
                ))
              )
            }
          </MasonryInfiniteScroller>
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
  nextParams: PropTypes.object
};

ReportsMasonry.contextTypes = {
  editModeOn: PropTypes.bool
};

ReportsMasonry.defaultProps = {
  reportGroups: [],
  loadMore: () => {}
};

export default PropsRerender(ReportsMasonry);
