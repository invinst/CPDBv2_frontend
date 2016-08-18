import { accentColor, softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const faqItemStyle = {
  color: softBlackColor,
  ':hover': {
    color: accentColor
  }
};

export const faqItemTitleStyle = {
  base: {
    color: 'inherit',
    paddingLeft: '16px',
    cursor: 'pointer',
    fontFamily: sanFranciscoTextFamily,
    fontSize: '16px',
    lineHeight: '20px',
    paddingTop: '32px',
    paddingBottom: '32px'
  },

  tablet: {
    paddingTop: '32px',
    paddingBottom: '32px'
  },

  extraWide: {
    fontSize: '20px'
  }
};
