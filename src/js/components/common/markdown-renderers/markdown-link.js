import React from 'react';

import style from './markdown-link.sass';


export default function MarkdownLink(props) {
  return <a className={ style.markdownLink } { ...props } />;
}
