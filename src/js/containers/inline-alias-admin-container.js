import { connect } from 'react-redux';

import InlineAliasAdmin from 'components/search-page/inline-alias-admin';
import { updateAliases } from 'actions/inline-alias-admin-page';

function mapStateToProps(state, ownProps) {
  return {
    id: state.inlineAliasAdminPage.id,
    type: state.inlineAliasAdminPage.type,
    text: state.inlineAliasAdminPage.text,
    description: state.inlineAliasAdminPage.description,
    existingAliases: state.inlineAliasAdminPage.existingAliases,
    errorMessage: state.inlineAliasAdminPage.errorMessage
  };
}

const mapDispatchToProps = {
  updateAliases
};

export default connect(mapStateToProps, mapDispatchToProps)(InlineAliasAdmin);
