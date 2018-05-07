import { accentColor } from 'utils/styles';


export const tabbedPaneSectionStyle = {
  backgroundColor: 'white',
};

export const menuStyle = {
  height: '64px',
  lineHeight: '64px',
  textAlign: 'center',
};

export const menuItemStyle = (active) => ({
  display: 'block-inline',
  height: '36px',
  backgroundColor: active ? accentColor : 'white',
  color: active ? 'white' : accentColor,
  fontSize: '14px',
  fontWeight: 300,
  borderRadius: '2px',
  padding: '8px 16px 10px 16px',
  cursor: 'pointer',
});
