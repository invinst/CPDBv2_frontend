import { altoColor, greyishColor, sugarCaneColor } from 'utils/styles';


export const wrapperStyle = {
  backgroundColor: sugarCaneColor,
  height: '280px',
};

export const metricSectionStyle = {
  backgroundColor: 'white',
  margin: '16px',
  border: `1px solid ${altoColor}`,
  position: 'absolute',
  width: 'calc(100% - 32px)',
};

export const verticalLineStyle = {
  margin: '16px 0',
  height: '216px',
  width: '2px',
  backgroundColor: greyishColor,
  display: 'inline-block',
  verticalAlign: 'top',
};

export const popupStyle = {
  position: 'absolute',
  top: '16px',
  right: 0,
};
