import { sanFranciscoTextFamily, clayGray, softBlackColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';

export const leftColumnStyle = {
  display: 'inline-block',
  width: '345px',
  paddingLeft: '16px',
  verticalAlign: 'top',
  paddingRight: '41px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  boxSizing: 'border-box',
  fontWeight: '400',
  lineHeight: '1.30',
  color: clayGray
};

export const imageStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
};

export const boldTextStyle = {
  textDecoration: 'none',
  color: softBlackColor,
  marginTop: 0,
  marginBottom: '24px'
};

export const normalTextStyle = {
  marginTop: 0,
  marginBottom: '24px'
};

export const imageSrc = imgUrl('v1-data-tool@2x.png');

export const imageSrcSet = `
  ${imgUrl('v1-data-tool.png')} 622w,
  ${imgUrl('v1-data-tool@2x.png')} 1244w,
  ${imgUrl('v1-data-tool@3x.png')} 1866w
`;

export const imageSizes = `
  (max-width: 768px) 398px,
  (min-width: 1440px) 1070px,
  calc(100vw - 370px)
`;

export const wrapperStyle = {
  marginBottom: '144px'
};
