import { connect } from 'react-redux';

import HeroSection from 'components/landing-page/hero-section';
import { updateLandingPage, turnOnSectionEditMode, turnOffSectionEditMode, HERO } from 'actions/landing-page';


const mapDispatchToProps = {
  onSaveForm: updateLandingPage,
  turnOnSectionEditMode: turnOnSectionEditMode.bind(null, HERO),
  turnOffSectionEditMode: turnOffSectionEditMode.bind(null, HERO)
};

function mapStateToProps(state, ownProps) {
  const { fields, editModeOn } = state.landingPage.heroSection;

  return {
    fields,
    sectionEditModeOn: editModeOn
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroSection);
