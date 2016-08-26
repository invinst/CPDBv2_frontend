import { lightGreyColor, accentColor, softBlackColor } from 'utils/styles';


export const faqItemWrapperStyle = {
  marginLeft: '16px',
  borderBottom: `1px solid ${lightGreyColor}`
};

export const faqItemExpandedStyle = {
  color: accentColor,
  ':hover': {
    color: softBlackColor
  }
};
