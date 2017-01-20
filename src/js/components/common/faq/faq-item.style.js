import { accentColor, softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const faqItemStyle = {
  color: softBlackColor,
  ':hover': {
    color: accentColor
  }
};

export const faqItemTitleStyle = {
  base: {
    color: softBlackColor,
    paddingLeft: '16px',
    cursor: 'pointer',
    fontFamily: sanFranciscoTextFamily,
    fontSize: '16px',
    lineHeight: '20px',
    paddingTop: '32px',
    paddingBottom: '32px',
    fontWeight: 500
  },

  tablet: {
    paddingTop: '32px',
    paddingBottom: '32px'
  },

  extraWide: {
    fontSize: '20px'
  }
};

export const titleReducedWidth = {
  width: 'calc(100% - 30px)',
  display: 'inline-block',
  boxSizing: 'border-box'
};

export const checkboxStyle = {
  display: 'inline-block',
  width: '30px'
};
