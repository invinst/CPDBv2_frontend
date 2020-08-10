import { connect } from 'react-redux';

import LawsuitPage from 'components/lawsuit-page';
import { lawsuitSelector } from 'selectors/lawsuit-page';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    ...lawsuitSelector(state),
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(LawsuitPage);
