import PropTypes from 'prop-types';
import React from 'react';

import { EditModeContext } from 'contexts';

export default function EditModeProvider(props) {
  const { children, editModeOn } = props;

  return (
    <EditModeContext.Provider value={ { editModeOn } }>
      { children }
    </EditModeContext.Provider>
  );
}

EditModeProvider.propTypes = {
  children: PropTypes.node,
  pathname: PropTypes.string,
  location: PropTypes.object,
  editModeOn: PropTypes.bool,
};

EditModeProvider.defaultProps = {
  editModeOn: false,
};
