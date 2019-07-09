import {
  sanFranciscoTextFamily,
  girlyPink,
  lightGirlyPink,
  accentColor,
  softBlackColor,
  clayGray,
  whiteTwoColor,
  sproutColor,
  japaneseLaurelColor
} from 'utils/styles';


export const searchBoxLineHeight = 32;
const searchBoxPadding = 8;
export const searchBoxHeight = searchBoxLineHeight + searchBoxPadding * 2;

export const searchContentWrapperStyle = (aliasEditModeOn) => ({
  minHeight: '100vh',
  background: aliasEditModeOn ? lightGirlyPink : 'white',
  fontFamily: sanFranciscoTextFamily,
});

export const searchBoxWrapperStyle = {
  backgroundColor: 'white',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1,
  height: '50px',
};

export const searchBoxStyle = (aliasEditModeOn, hasBottomBorder) => {
  let style = {
    backgroundColor: aliasEditModeOn ? girlyPink : 'white',
    padding: `${searchBoxPadding}px 0 9px 0`,
    margin: '0 16px',
    width: 'calc(100% - 32px)',
  };

  if (hasBottomBorder) {
    style['borderBottom'] = `1px solid ${whiteTwoColor}`;
  }

  return style;
};

const _cancelButtonStyle = (searchTermsHidden) => ({
  display: 'inline-block',
  fontSize: '13px',
  color: searchTermsHidden ? clayGray : accentColor,
  width: '41px',
  cursor: 'pointer',
  position: 'relative',
  top: '6px'
});

export const cancelButtonStyle = (searchTermsHidden) => ({
  base: _cancelButtonStyle(searchTermsHidden),
  hover: {
    ..._cancelButtonStyle(searchTermsHidden),
    color: softBlackColor
  }
});

export const searchMainPanelWrapperStyle = {
  paddingTop: '50px',
};

export const toastWrapperStyle = {
  backgroundColor: sproutColor,
  borderRadius: '2px',
  color: japaneseLaurelColor,
  lineHeight: '40px',
  minHeight: '40px',
  padding: 0,
  textAlign: 'center',
  width: 'auto',
};

export const toastBodyStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 300,
  fontSize: '14px',
};
