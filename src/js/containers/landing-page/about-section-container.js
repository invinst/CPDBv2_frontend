import { connect } from 'react-redux';

import AboutSection from 'components/landing-page/about-section';
import { updateLandingPage, turnOnSectionEditMode, turnOffSectionEditMode, ABOUT } from 'actions/landing-page';


const mapDispatchToProps = {
  onSaveForm: updateLandingPage,
  turnOnSectionEditMode: turnOnSectionEditMode.bind(null, ABOUT),
  turnOffSectionEditMode: turnOffSectionEditMode.bind(null, ABOUT)
};

function mapStateToProps(state, ownProps) {
  return {
    fields: state.landingPage.aboutSection.fields,
    sectionEditModeOn: state.landingPage.aboutSection.editModeOn
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutSection);
