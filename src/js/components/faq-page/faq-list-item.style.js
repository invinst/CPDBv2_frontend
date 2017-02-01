import { lightGreyColor, accentColor, softBlackColor } from 'utils/styles';


export const faqItemWrapperStyle = {
  marginLeft: '16px',
  borderBottom: `1px solid ${lightGreyColor}`
};

export const faqItemStyle = {
  base: {
    color: softBlackColor
  },
  hover: {
    color: accentColor
  }
};

export const faqItemExpandedStyle = {
  base: {
    color: softBlackColor,
    fontWeight: '600'
  }
};
