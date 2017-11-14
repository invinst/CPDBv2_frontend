import { sanFranciscoTextFamily, greyishColor, softBlackColor } from 'utils/styles';


export const wrapperStyle = {
  display: 'inline-block',
  padding: '16px',
  boxSizing: 'border-box',
  textDecoration: 'none'
};

export const visualTokenStyle = {
  display: 'block',
  maxHeight: '328px',
};

export const officerTextStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '12px',
  fontWeight: '500',
  color: greyishColor,
  marginTop: '11px',
  marginBottom: 0,
  height: '14px'
};

export const fullNameTextStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: '500',
  marginBottom: '13px',
  color: softBlackColor,
  marginTop: 0
};
