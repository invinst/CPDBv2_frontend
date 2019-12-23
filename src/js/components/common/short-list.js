import PropTypes from 'prop-types';
import React from 'react';

import { wrapperStyle, labelStyle, contentStyle, rowStyle } from './short-list.style';


export default function ShortList(props) {
  const { title, data } = props;

  function renderRow(data) {
    return (
      data.map(([label, content], index) =>
        <tr className='test--short-list-row' style={ rowStyle } key={ index }>
          <td style={ labelStyle }>{ label }</td>
          <td style={ contentStyle }>{ content || 'Not Available' }</td>
        </tr>
      )
    );
  }

  return (
    <div style={ wrapperStyle }>
      <div className='test--short-list-title'>{ title }</div>
      <table>
        <tbody>{ renderRow(data) }</tbody>
      </table>
    </div>
  );
}

ShortList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

ShortList.defaultProps = {
  title: '',
};
