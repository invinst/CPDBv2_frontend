import React from 'react';
import PropTypes from 'prop-types';

import MarkdownLink from 'components/common/markdown-renderers/markdown-link';
import ReactMarkdown from 'react-markdown';


export default function PinboardToast({ toastMessage }) {
  return (
    <React.Fragment>
      <ReactMarkdown className='toast-message' source={ toastMessage } renderers={ { link: MarkdownLink } } />
      <div className='go-to-pinboard-btn' >Go to pinboard</div>
    </React.Fragment>
  );
}

PinboardToast.propTypes = {
  toastMessage: PropTypes.string,
};
