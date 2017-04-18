import {
  sanFranciscoTextFamily, hardBlackColor, mediumGrayColor, accentColor, veryLightBigStone,
  softBlackColor
} from 'utils/styles';

export const crTextStyle = {
  display: 'inline-block',
  width: '169px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 500,
  color: hardBlackColor,
  marginTop: '3px'
};

export const crNumberStyle = {
  ...crTextStyle,
  color: mediumGrayColor,
  display: 'inline'
};

export const dateStyle = {
  width: '111px',
  marginLeft: '136px',
  textAlign: 'right',
  display: 'inline-block',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 500,
  color: mediumGrayColor
};

export const findingStyle = {
  display: 'inline-block',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 500,
  color: hardBlackColor,
  padding: '4px 8px',
  backgroundColor: veryLightBigStone,
  borderRadius: '2px',
  marginTop: '8px',
  textAlign: 'center'
};

export const coaccusedStyle = {
  width: '169px',
  display: 'inline-block',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 500,
  color: mediumGrayColor,
  marginTop: '11px'
};

export const categoryStyle = hovering => ({
  fontFamily: sanFranciscoTextFamily,
  fontSize: '18px',
  fontWeight: 600,
  color: hovering ? accentColor : softBlackColor,
  marginTop: '11px'
});

export const subcategoryStyle = hovering => ({
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 500,
  color: hovering ? accentColor : mediumGrayColor,
  opacity: hovering ? .5 : 1,
  marginTop: '2px'
});

export const documentIconStyle = {

};

export const audioIconStyle = {

};
