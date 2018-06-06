import { ATTACHMENT_TYPES } from 'utils/constants';

import { whiteTwoColor } from 'utils/styles';


export const imageStyle = (imageUrl, fileType) => ({
  float: 'right',
  height: '32px',
  width: '24px',
  display: 'inline-block',
  border: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
  background: `white url(${imageUrl}) no-repeat center center`,
  backgroundSize: fileType === ATTACHMENT_TYPES.DOCUMENT ? 'cover' : 'auto',
});

export const wrapperStyle = {
  width: '51px',
  display: 'inline-block',
  margin: '0 8px 0 17px',
  verticalAlign: 'middle',
};

export const moreStyle = {
  float: 'right',
  width: '24px',
  marginLeft: '3px',
  lineHeight: '32px',
  height: '32px',
  display: 'inline-block',
  border: `solid 1px ${whiteTwoColor}`,
  textAlign: 'center',
  boxSizing: 'border-box',
  fontSize: '12px',
};
