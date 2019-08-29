import { sanFranciscoTextFamily, softBlackColor, whiteTwoColor, clayGray } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';

export const officersWrapperStyle = {
  backgroundColor: 'white',
};

export const officersHeaderStyle = {
  padding: '18px 0 8px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 500,
};

export const officerTextStyle = {
  display: 'inline-block',
  width: 'calc(100% - 8px)',
  verticalAlign: 'middle',
};

export const officerNameTextStyle = {
  color: softBlackColor,
  fontWeight: 400,
};

export const officerItemStyle = isLast => ({
  textDecoration: 'none',
  borderBottom: isLast ? 0 : `1px solid ${ whiteTwoColor }`,
  padding: '12px 0',
  display: 'block',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
});

export const complaintsCountStyle = {
  color: clayGray,
  fontWeight: 300,
};

export const rightArrowStyle = {
  background: `url("${imgUrl('disclosure-indicator.svg')}") 0px 0px no-repeat scroll`,
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '8px',
  height: '13px',
};
