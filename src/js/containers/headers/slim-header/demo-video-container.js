import { connect } from 'react-redux';

import DemoVideo from 'components/headers/slim-header/slim-header-content/demo-video';
import { mergeEditWrapperStateProps } from 'utils/container';
import { getCMSFields } from 'selectors/cms';
import { getDemoVideoSectionEditModeOn } from 'selectors/headers/slim-header';
import { updatePage } from 'actions/cms';
import { turnOnDemoVideoSectionEditMode, turnOffDemoVideoSectionEditMode } from 'actions/headers/slim-header';
import { openVideoModal } from 'actions/video-modal';
import { thumbnailUrlSelector } from 'selectors/headers/slim-header';
import * as constants from 'utils/constants';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    fields: getCMSFields(constants.LANDING_PAGE_ID)(state),
    sectionEditModeOn: getDemoVideoSectionEditModeOn(state),
    videoThumbnailUrl: thumbnailUrlSelector(state),
  };
}

const mapDispatchToProps = {
  onSaveForm: updatePage(constants.LANDING_PAGE_ID),
  turnOnSectionEditMode: turnOnDemoVideoSectionEditMode,
  turnOffSectionEditMode: turnOffDemoVideoSectionEditMode,
  openVideoModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeEditWrapperStateProps
)(DemoVideo);
