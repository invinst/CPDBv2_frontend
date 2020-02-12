import PropTypes from 'prop-types';
import React from 'react';

import { editModeOn } from 'utils/edit-path';
import { EditModeContext } from 'contexts';

export default function EditModeProvider(props) {
  const { children, location } = props;

  return (
    <EditModeContext.Provider value={ { editModeOn: editModeOn(location.pathname) } }>
      { children }
    </EditModeContext.Provider>
  );
}

EditModeProvider.propTypes = {
  children: PropTypes.node,
  pathname: PropTypes.string,
  location: PropTypes.object,
};

EditModeProvider.defaultProps = {
  location: {
    pathname: '',
  },
};
