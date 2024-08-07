import { connect } from 'react-redux';

import LawsuitPage from 'components/lawsuit-page';
import { lawsuitSelector } from 'selectors/lawsuit-page';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    ...lawsuitSelector(state),
  };
}

const mapDispatchToProps = {
  addOrRemoveItemInPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(LawsuitPage);
