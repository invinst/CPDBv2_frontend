import {
  sanFranciscoTextFamily, softBlackColor, whiteTwoColor, accentColor, sugarCaneColor
} from 'utils/styles';


export const wrapperStyle = expanded => ({
  paddingTop: '38px',
  overflow: 'hidden',
  position: 'relative',
  maxHeight: expanded ? 'none' : '754px',
});

export const headerStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 400,
  padding: '0 16px',
  color: softBlackColor,
  marginTop: 0,
  marginBottom: '16px'
};

export const accusedOfficersWrapperStyle = {
  boxSizing: 'border-box',
  padding: '0 16px'
};

export const moreButtonStyle = {
  borderTop: `1px solid ${whiteTwoColor}`,
  position: 'absolute',
  boxSizing: 'border-box',
  top: '750px',
  width: '100%',
  height: '42px',
  backgroundColor: sugarCaneColor,
  textAlign: 'center',
  color: accentColor,
  fontSize: '14px',
  cursor: 'pointer',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400,
  padding: '13px 0'
};

export const bottomMarginStyle = {
  borderTop: `1px solid ${whiteTwoColor}`,
  height: '42px',
  backgroundColor: sugarCaneColor
};
