import { pinkishGreyColor, fashionPinkColor } from 'utils/styles';


export const leftBarStyle = {
  display: 'inline-block',
  boxSizing: 'border-box',
  paddingLeft: '32px',
  paddingTop: '74px',
  width: '482px',
  borderRight: `1px solid ${pinkishGreyColor}`,
  minHeight: '663px'
};

export const rightBarStyle = {
  display: 'inline-block',
  boxSizing: 'border-box',
  padding: '77px 32px 0',
  width: '704px',
  verticalAlign: 'top',
  borderLeft: `1px solid ${pinkishGreyColor}`,
  marginLeft: '-1px',
  minHeight: '663px'
};

export const answerStyle = {
  wrapper: {
    fontSize: '18px',
    fontWeight: '400',
    marginBottom: '12px'
  },
  paragraph: {
    marginTop: 0,
    marginBottom: '20px'
  }
};

export const questionStyle = {
  fontSize: '32px',
  fontWeight: '600',
  marginBottom: '32px',
  paddingRight: '32px'
};

export const answerWrapperStyle = {
  fontSize: '18px',
  fontWeight: '400',
  color: fashionPinkColor
};
