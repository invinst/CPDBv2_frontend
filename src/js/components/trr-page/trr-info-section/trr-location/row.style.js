import { whiteTwoColor, clayGray, softBlackColor } from 'utils/styles';


export const wrapperStyle = (hideBorder) => ({
  display: 'inline-block',
  margin: '0 16px 0 0',
  width: '100%',
  fontSize: '14px',
  fontWeight: 300,
  borderBottom: hideBorder ? 'none' : `1px solid ${whiteTwoColor}`,
});

export const titleStyle = {
  padding: '12px 0',
  display: 'inline-block',
  width: '34%',
  color: clayGray,
};

export const valueStyle = {
  verticalAlign: 'top',
  padding: '12px 0',
  display: 'inline-block',
  width: '66%',
  color: softBlackColor,
  fontWeight: 400,
};
