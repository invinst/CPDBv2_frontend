import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FAQ from 'components/bottom-sheet/faq';
import { updateFAQ, askQuestion } from 'actions/faq-page';


function mapStateToProps(state, { fields, turnOffSectionEditMode }) {
  return {
    fields,
    turnOffSectionEditMode
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    onSaveForm: ownProps.id ? updateFAQ.bind(null, ownProps.id) : askQuestion
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);
