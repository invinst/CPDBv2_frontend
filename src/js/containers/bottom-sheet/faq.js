import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FAQ from 'components/bottom-sheet/faq';
import { updateFAQ } from 'actions/faq-page';


function mapStateToProps(state, { fields, turnOffSectionEditMode }) {
  return {
    fields,
    turnOffSectionEditMode
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    onSaveForm: updateFAQ.bind(null, ownProps.id)
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);
