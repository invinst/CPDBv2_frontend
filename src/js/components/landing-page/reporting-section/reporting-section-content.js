import React, { PropTypes, Component } from 'react';

import MasonryLayout from 'components/common/masonry-layout';
import PropsRerender from 'components/common/higher-order/props-rerender';
import Link from 'components/common/react-router-link';
import { wrapperStyle, borderSleeveStyle, loadMoreStyle } from './reporting-section-content.style';
import ReportGroup from 'components/reporting-page/report-group';
import { STORIES_PATH } from 'utils/constants';
import { masonrySizes } from 'components/reporting-page/group-types';

class ReportingSectionContent extends Component {
  render() {
    const { reportGroups, onReportClick } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div style={ borderSleeveStyle }/>
        <MasonryLayout
          sizes={ masonrySizes }>
          {
            reportGroups.map(group =>
              <ReportGroup
                key={ group.key }
                onReportClick={ onReportClick }
                { ...group }/>
            )
          }
        </MasonryLayout>
        <Link to={ `/${STORIES_PATH}` } style={ loadMoreStyle }>More</Link>
      </div>
    );
  }
}

ReportingSectionContent.propTypes = {
  reportGroups: PropTypes.array,
  onReportClick: PropTypes.func
};

ReportingSectionContent.defaultProps = {
  reportGroups: [],
  onReportClick: () => {}
};

export default PropsRerender(ReportingSectionContent);
