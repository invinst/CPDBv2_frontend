import { connect } from 'react-redux';

import Toolbar from 'components/inline-editable/rich-text-editor/toolbar';
import { createLinkEntity, removeLinkEntity } from 'actions/rich-text-editor';


const mapDispatchToProps = {
  createLinkEntity,
  removeLinkEntity
};

const mapStateToProps = (state, ownProps) => {
  const { contentStateKey, editorState, show } = state.richTextToolbar;
  return {
    contentStateKey,
    editorState,
    show
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
