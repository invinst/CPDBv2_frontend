import { softBlackColor, clayGray, whiteTwoColor } from 'utils/styles';


export const wrapperStyle = {
  backgroundColor: 'white',
  margin: '0 -8px 8px',
  boxShadow: `0 2px ${whiteTwoColor}`,
};

export const titleStyle = {
  fontSize: '26px',
  color: softBlackColor,
  margin: 0,
  padding: '16px 8px',
  lineHeight: '32px',
  fontWeight: 500,
};

export const listStyle = {
  listStyleType: 'none',
  padding: '0 8px',
  margin: 0,
};

export const listItemStyle = {
  lineHeight: '18px',
  borderTop: `1px solid ${whiteTwoColor}`,
  padding: '10px 0',
  position: 'relative',
};

export const itemKeyStyle = {
  color: clayGray,
  width: '96px',
  float: 'left',
};

export const itemValueStyle = (hasKey) => ({
  float: 'left',
  width: hasKey ? 'calc(100% - 106px)' : '100%',
});

export const clearfixStyle = {
  clear: 'both',
};

export const arrowStyle = {
  position: 'absolute',
  top: '50%',
  right: 0,
  transform: 'translateY(-50%)',
  width: '7.4px',
  height: '12px',
};
