import { sugarCaneColor, altoColor, softBlackColor, clayGray } from 'utils/styles';


export const wrapperStyle = {
  borderRadius: '2px',
  backgroundColor: sugarCaneColor,
  border: `solid 1px ${altoColor}`,
  padding: '0 16px 128px 16px',
  margin: '0 16px',
};

export const titleStyle = {
  height: '64px',
  position: 'relative',
};

export const titleTextStyle = {
  bottom: '8px',
  position: 'absolute',
  fontWeight: 500,
  fontSize: '14px',
};

export const attachmentsTextStyle = {
  color: softBlackColor,
};

export const graphicContentTextStyle = {
  color: clayGray,
};
