import { sanFranciscoTextFamily, softBlackColor, greyishColor, mediumGrayColor, whiteTwoColor } from 'utils/styles';


export const wrapperStyle = {
  fontFamily: sanFranciscoTextFamily,
  padding: '10px 0',
  fontSize: '14px',
  minHeight: '18px',
  textAlign: 'center',
  borderTop: `solid 1px ${whiteTwoColor}`,
  borderBottom: `solid 1px ${whiteTwoColor}`
};

export const labelStyle = {
  fontWeight: 400,
  color: greyishColor,
  display: 'inline-block',
  float: 'left',
  width: '175px',
  textAlign: 'left'
};

export const officerNameStyle = {
  fontWeight: 500,
  color: softBlackColor,
  paddingRight: '16px',
  display: 'inline-block',
  float: 'left'
};

export const extraInfoStyle = {
  fontWeight: 400,
  color: mediumGrayColor,
  display: 'inline-block',
  float: 'left'
};

export const viewOfficerButtonWrapperStyle = {
  paddingRight: '19px',
  fontWeight: 400,
  color: mediumGrayColor,
  display: 'inline-block',
  cursor: 'pointer',
  float: 'right'
};

export const rightIndicatorStyle= {

};
