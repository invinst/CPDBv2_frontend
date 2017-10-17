import { sanFranciscoTextFamily, softBlackColor, whiteTwoColor, greyishColor, accentColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const emptyMessageStyle = {
  color: greyishColor,
  fontSize: '14px',
  padding: '11px 0'
};

export const titleStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 'bold',
  textAlign: 'left',
  color: softBlackColor,
  display: 'block'
};

export const itemTitleStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: '500',
  textAlign: 'left',
  color: softBlackColor,
  marginTop: '16px',
  paddingBottom: '10px',
  textDecoration: 'none',
  display: 'inline-block',
  width: 'calc(100% - 37px)'
};

export const itemTitleWithBorderStyle = {
  borderBottom: `1px solid ${whiteTwoColor}`,
  ...itemTitleStyle
};

export const iconStyle = iconName => ({
  width: '13px',
  height: '16px',
  display: 'inline-block',
  verticalAlign: 'middle',
  marginRight: '21px',
  background: `url(${imgUrl(iconName)}) left center / auto no-repeat`
});

export const requestLinkStyle = {
  cursor: 'pointer',
  color: softBlackColor
};

export const okMarkStyle = {
  color: accentColor
};
