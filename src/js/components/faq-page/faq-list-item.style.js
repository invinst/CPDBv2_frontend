import { lightGreyColor, accentColor, softBlackColor } from 'utils/styles';


export const faqItemWrapperStyle = {
  borderBottom: `1px solid ${lightGreyColor}`
};

export const faqItemExpandedStyle = {
  color: accentColor,
  ':hover': {
    color: softBlackColor
  }
};
