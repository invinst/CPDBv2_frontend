import { connect } from 'react-redux';

import VFTGSection from 'components/landing-page/vftg-section';
import {
  updateLandingPage, turnOnSectionEditMode, turnOffSectionEditMode, VFTG
} from 'actions/landing-page';


const mapDispatchToProps = {
  onSaveForm: updateLandingPage,
  turnOnSectionEditMode: turnOnSectionEditMode.bind(null, VFTG),
  turnOffSectionEditMode: turnOffSectionEditMode.bind(null, VFTG)
};

function mapStateToProps(state, ownProps) {
  const { fields, editModeOn } = state.landingPage.vftgSection;

  return {
    fields,
    sectionEditModeOn: editModeOn
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VFTGSection);
