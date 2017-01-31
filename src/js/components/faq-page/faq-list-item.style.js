import { lightGreyColor, accentColor, softBlackColor } from 'utils/styles';


export const faqItemWrapperStyle = {
  marginLeft: '16px',
  borderBottom: `1px solid ${lightGreyColor}`
};

export const faqItemStyle = {
  color: softBlackColor,
  ':hover': {
    color: accentColor
  }
};

export const faqItemExpandedStyle = {
  color: softBlackColor,
  fontWeight: '600'
};
