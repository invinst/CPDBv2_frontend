import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FAQ from 'components/bottom-sheet/faq';
import { updateFAQ, askQuestion, fetchFAQ } from 'actions/faq-page';


function mapStateToProps(state, { fields, turnOffSectionEditMode, id }) {
  return {
    fields,
    faqId: id,
    turnOffSectionEditMode
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    onSaveForm: ownProps.id ? updateFAQ.bind(null, ownProps.id) : askQuestion,
    fetchFAQ
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);
