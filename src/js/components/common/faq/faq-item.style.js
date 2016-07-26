import { lightGreyColor, accentColor, softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const faqItemStyle = {
  borderBottom: `1px solid ${lightGreyColor}`
};

export const faqItemTitleStyle = {
  base: {
    color: softBlackColor,
    height: '72px',
    paddingLeft: '16px',
    lineHeight: '72px',
    cursor: 'pointer',
    fontFamily: sanFranciscoTextFamily,
    fontSize: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ':hover': {
      color: accentColor
    }
  },

  extraWide: {
    fontSize: '20px'
  }
};
