import { lightGreyColor, pinkishWhiteColor, accentColor, softBlackColor } from 'utils/styles';


export const faqItemWrapperStyle = {
  marginLeft: '16px',
  borderBottom: `1px solid ${lightGreyColor}`
};

const faqTitleStyle = {
  base: {
    color: softBlackColor
  },
  hover: {
    color: accentColor
  }
};

const faqTitleExpandedStyle = {
  base: {
    color: softBlackColor,
    fontWeight: '600'
  }
};

export const dropPreviewStyle = {
  height: '85px',
  backgroundColor: pinkishWhiteColor,
  marginLeft: '16px'
};

export function faqStyle(expanded) {
  return {
    title: expanded ? faqTitleExpandedStyle : faqTitleStyle
  };
}
