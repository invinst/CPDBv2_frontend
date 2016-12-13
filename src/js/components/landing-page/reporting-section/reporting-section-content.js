import React, { PropTypes, Component } from 'react';

import MasonryLayout from 'components/common/masonry-layout';
import PropsRerender from 'components/common/higher-order/props-rerender';
import {
  wrapperStyle, borderSleeveStyle, loadMoreStyle, loadMoreHoverStyle
} from './reporting-section-content.style';
import ReportGroup from 'components/reporting-page/report-group';
import { masonrySizes } from 'components/reporting-page/group-types';
import LinkButton from 'components/common/link-button';
import { STORIES_PATH } from 'utils/constants';

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
        <LinkButton
          link={ `/${STORIES_PATH}` }
          normalStyle={ loadMoreStyle }
          hoverStyle={ loadMoreHoverStyle }>More
        </LinkButton>
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
