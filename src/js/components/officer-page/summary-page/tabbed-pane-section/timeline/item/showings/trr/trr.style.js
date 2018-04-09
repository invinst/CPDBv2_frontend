import { snowColor, softBlackColor, clayGray, } from 'utils/styles';


const height = 58;

export const wrapperShowingStyle = {
  backgroundColor: snowColor,
};

export const showingStyle = {
  backgroundColor: snowColor,
  height: `${height}px`,
  lineHeight: `${height}px`,
  display: 'inline-block',
};

export const kindStyle = {
  width: '57px',
  color: 'white',
  backgroundColor: clayGray,
  fontWeight: 300,
};

export const categoryStyle = {
  width: '297px',
  display: 'inline-block',
  verticalAlign: 'middle',
};

export const dateStyle = {
  fontSize: '12px',
  color: softBlackColor,
  fontWeight: 300,
};
