import { softBlackColor, clayGray, snowColor, accentColor, } from 'utils/styles';


const height = 58;

export const showingStyle = {
  height: `${height}px`,
  lineHeight: `${height - 1}px`,
  display: 'inline-block',
};

export const wrapperShowingStyle = (hovering) => ({
  backgroundColor: hovering ? 'white' : snowColor,
});

export const kindStyle = {
  width: '57px',
  color: 'white',
  backgroundColor: clayGray,
  fontWeight: 300,
};

export const categoryStyle = (hovering) => ({
  display: 'inline-block',
  verticalAlign: 'middle',
  color: hovering ? accentColor : softBlackColor,
});

export const dateStyle = {
  fontSize: '12px',
  color: softBlackColor,
  fontWeight: 300,
};
