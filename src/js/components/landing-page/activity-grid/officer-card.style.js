import { sanFranciscoTextFamily, greyishColor, softBlackColor } from 'utils/styles';


export const wrapperStyle = {
  display: 'inline-block',
  width: '25%',
  padding: '16px',
  boxSizing: 'border-box',
  textDecoration: 'none'
};

export const visualTokenStyle = {
  display: 'block',
  height: 'calc(25vw - 32px)',
  maxHeight: '328px',
  minHeight: '160px'
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
