import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FAQ from 'components/bottom-sheet/faq';
import { updateFAQ, askQuestion, fetchFAQ } from 'actions/faq-page';
import { faqSelector } from 'selectors/bottom-sheet/faq';


function mapStateToProps(state, props) {
  const { fields, id } = faqSelector(state, props);
  const { turnOffSectionEditMode } = props;
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
