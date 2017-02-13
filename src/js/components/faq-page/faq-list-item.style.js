import { lightGreyColor, pinkishWhiteColor, accentColor, softBlackColor } from 'utils/styles';


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

export const dropPreviewStyle = {
  height: '85px',
  backgroundColor: pinkishWhiteColor,
  marginLeft: '16px'
};
