import { lightGreyColor, accentColor } from 'utils/styles';


export const faqItemStyle = {
  borderBottom: `1px solid ${lightGreyColor}`
};

export const faqItemTitleStyle = {
  height: '72px',
  paddingLeft: '16px',
  lineHeight: '72px',
  cursor: 'pointer',
  fontFamily: 'San Francisco Text Web',
  fontSize: '13px',
  fontWeight: 500
};

export const faqItemActiveTitleStyle = {
  height: '72px',
  paddingLeft: '16px',
  lineHeight: '72px',
  cursor: 'pointer',
  fontFamily: 'San Francisco Text Web',
  fontSize: '13px',
  fontWeight: 500,
  color: accentColor
};
