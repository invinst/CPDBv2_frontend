import { whiteTwoColor, clayGray, softBlackColor } from 'utils/styles';


export const wrapperStyle = (isLeft, hideBorder) => ({
  display: 'inline-block',
  margin: isLeft ? '0 16px 0 0' : '0 0 0 16px',
  width: 'calc(50% - 16px)',
  height: '40px',
  lineHeight: '40px',
  fontSize: '14px',
  fontWeight: 300,
  borderBottom: hideBorder ? 'none' : `1px solid ${whiteTwoColor}`,
});

export const titleStyle = {
  width: '34%',
  display: 'inline-block',
  verticalAlign: 'middle',
  color: clayGray,
};

export const valueStyle = {
  width: '66%',
  display: 'inline-block',
  verticalAlign: 'middle',
  color: softBlackColor,
  fontWeight: 400,
};

export const subValueStyle = {
  color: clayGray,
  marginLeft: '4px',
  fontWeight: 300,
};
