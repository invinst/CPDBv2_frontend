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

export const imageLinkStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  width: 'calc(100% - 370px)'
};

export const imageStyle = {
  width: '100%'
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

export const imageSrc = imgUrl('v1-2-data-tool@2x.png');

export const wrapperStyle = {
  marginBottom: '144px'
};
