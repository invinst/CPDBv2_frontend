import { softBlackColor, clayGray, greyishColor, whiteTwoColor } from 'utils/styles';


const NUM_RESPONSIVE_COLUMNS = 3;

export const containerStyle = {
  height: '305px',
  padding: '26px 16px 6px',
  overflow: 'auto',
  boxSizing: 'border-box'
};

export const headerStyle = {
  fontSize: '14px',
  fontWeight: 600,
  color: softBlackColor,
  margin: 0,
  padding: 0,
  textAlign: 'center',
};

export const tableHeaderStyle = {
  fontSize: '12px',
  color: clayGray,
  fontWeight: 500,
  padding: '14px 0 11px 110px',
  boxSizing: 'border-box',
  borderBottom: `1px solid ${whiteTwoColor}`,
  lineHeight: '15px,'
};

export const tableHeaderItemStyle = {
  display: 'inline-block',
  paddingRight: '10px',
  width: `calc((100%) / ${NUM_RESPONSIVE_COLUMNS})`,
  boxSizing: 'border-box',
  verticalAlign: 'top',
};

export const tableContentStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  fontWeight: 400,
};

export const yearTextStyle = {
  display: 'inline-block',
  color: greyishColor,
  padding: '13px 0 11px',
  fontSize: '13px',
  borderBottom: `1px solid ${whiteTwoColor}`,
  width: '62px',
  marginLeft: '16px',
  verticalAlign: 'top',
  fontWeight: 300,
};

export const radarStyle = {
  display: 'inline-block',
  marginTop: '5px',
  width: '32px',
  height: '32px',
  borderRadius: '3px',
  overflow: 'hidden',
};

export const cellStyle = {
  display: 'inline-block',
  padding: '12px 0 11px',
  fontSize: '14px',
  borderBottom: `1px solid ${whiteTwoColor}`,
  width: `calc((100% - 110px) / ${NUM_RESPONSIVE_COLUMNS})`,
  verticalAlign: 'top',
};
