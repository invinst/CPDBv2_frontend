import { softBlackColor, sugarCaneColor, boulderColor, accentColor } from 'utils/styles';


export const searchInputStyle = {
  input: {
    color: softBlackColor,
    outline: 'none',
    border: 0,
    fontSize: '14px',
    verticalAlign: 'top',
    fontWeight: 300,
    backgroundColor: 'transparent',
  },
  wrapper: {
    boxSizing: 'border-box',
    width: '100%',
    height: '32px',
    padding: 0,
  },
  placeholder: {
    // color: boulderColor,
    fontSize: '14px',
  },
};

const _searchTermsButtonStyle = (searchTermsHidden) => ({
  position: 'absolute',
  color: searchTermsHidden ? accentColor : boulderColor,
  right: '16px',
  lineHeight: '32px',
  fontSize: '13px',
  fontWeight: 300,
  cursor: 'pointer',
});

export const searchTermsButtonStyle = (searchTermsHidden) => ({
  base: _searchTermsButtonStyle(searchTermsHidden),
  hover: {
    ..._searchTermsButtonStyle(searchTermsHidden),
    color: accentColor,
  },
});

export const wrapperStyle = {
  position: 'relative',
  width: 'calc(100% - 64px)',
  display: 'inline-block',
  marginRight: '23px',
};
