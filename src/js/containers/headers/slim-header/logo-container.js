import { connect } from 'react-redux';

import Logo from 'components/headers/slim-header/logo';
import { getCMSFields } from 'selectors/cms';
import { getLogoSectionEditModeOn } from 'selectors/headers/slim-header';
import { updatePage } from 'actions/cms';
import { turnOnLogoSectionEditMode, turnOffLogoSectionEditMode } from 'actions/headers/slim-header';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    fields: getCMSFields('landing-page')(state),
    sectionEditModeOn: getLogoSectionEditModeOn(state),
  };
}

const mapDispatchToProps = {
  onSaveForm: updatePage('landing-page'),
  turnOnSectionEditMode: turnOnLogoSectionEditMode,
  turnOffSectionEditMode: turnOffLogoSectionEditMode
};

export default connect(mapStateToProps, mapDispatchToProps)(Logo);
