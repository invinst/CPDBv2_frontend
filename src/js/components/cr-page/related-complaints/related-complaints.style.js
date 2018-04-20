import { softBlackColor, clayGray, greyishColor } from 'utils/styles';


export const wrapperStyle = {
  padding: '48px 0 88px 16px',
  backgroundColor: softBlackColor
};

export const titleStyle = {
  color: 'white',
  fontSize: '26px',
  fontWeight: 300,
  display: 'inline-block',
  width: '288px'
};

export const headerStyle = {
  borderBottom: `1px solid ${clayGray}`,
  marginRight: '16px'
};

export const filterStyle = {
  display: 'inline-block',
  color: greyishColor,
  width: 'calc(100% - 288px)',
  textAlign: 'right',
  fontSize: '14px',
  fontWeight: 300
};
