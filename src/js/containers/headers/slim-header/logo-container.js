import { connect } from 'react-redux';

import Logo from 'components/headers/slim-header/slim-header-content/logo';
import { mergeEditWrapperStateProps } from 'utils/container';
import { getCMSFields } from 'selectors/cms';
import { getLogoSectionEditModeOn } from 'selectors/headers/slim-header';
import { updatePage } from 'actions/cms';
import { turnOnLogoSectionEditMode, turnOffLogoSectionEditMode } from 'actions/headers/slim-header';
import * as constants from 'utils/constants';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    fields: getCMSFields(constants.LANDING_PAGE_ID)(state),
    sectionEditModeOn: getLogoSectionEditModeOn(state),
  };
}

const mapDispatchToProps = {
  onSaveForm: updatePage(constants.LANDING_PAGE_ID),
  turnOnSectionEditMode: turnOnLogoSectionEditMode,
  turnOffSectionEditMode: turnOffLogoSectionEditMode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeEditWrapperStateProps
)(Logo);
