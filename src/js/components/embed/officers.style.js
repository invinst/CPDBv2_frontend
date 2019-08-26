import { clayGray, softBlackColor } from 'utils/styles';


export const wrapperStyle = {
  backgroundColor: 'white',
  padding: '18px 0 12px 0',
};

export const headerWrapperStyle = {
  width: '336px',
  display: 'inline-block',
  verticalAlign: 'top',
  boxSizing: 'border-box',
  maxWidth: '50%',
};

export const carouselStyle = {
  wrapper: {
    width: 'calc(100% - 336px)',
    verticalAlign: 'top',
    display: 'inline-block',
    minWidth: '50%',
  },
};

export const itemStyle = {
  width: '232px',
};

export const titleStyle = {
  fontSize: '26px',
  fontWeight: 400,
  textAlign: 'left',
  color: softBlackColor,
  padding: '0 16px',
  marginTop: 0,
  marginBottom: '16px',
};

export const descriptionStyle = {
  padding: '16px',
  fontSize: '14px',
  textAlign: 'left',
  fontWeight: 300,
  color: clayGray,
};
