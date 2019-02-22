import { connect } from 'react-redux';

import DocumentPage from 'components/document-page';
import { documentSelector } from 'selectors/document-page';


function mapStateToProps(state, ownProps) {
  return documentSelector(state);
}

const mapDispatchToProps = {
};

// const editWrapperStateProps = (stateProps, dispatchProps, ownProps) => {
//   return {};
// };

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
