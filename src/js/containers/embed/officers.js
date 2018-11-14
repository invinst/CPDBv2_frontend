import { connect } from 'react-redux';

import EmbedOfficers from 'components/embed/officers';
import { embedOfficersSelector } from 'selectors/embed/officers';
import { requestEmbedOfficers } from 'actions/embed/officers';


function mapStateToProps(state, ownProps) {
  const { ids, title, description } = ownProps.location.query;
  return {
    title,
    description,
    officerIds: ids,
    officers: embedOfficersSelector(state),
  };
}

const mapDispatchToProps = {
  requestOfficers: requestEmbedOfficers
};

export default connect(mapStateToProps, mapDispatchToProps)(EmbedOfficers);
