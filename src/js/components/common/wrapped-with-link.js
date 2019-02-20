import React from 'react';
import { Link } from 'react-router';

import { omit } from 'lodash';


export default function WrappedWithLink(props) {
  const { to, url } = props;

  const passingProps = omit(props, ['to', 'url']);

  if (to)
    return <Link to={ to } { ...passingProps }/>;

  if (url)
    return <a href={ url } target='_blank' { ...passingProps }/>;

  return <div { ...passingProps }/>;
}
