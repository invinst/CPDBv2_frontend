import { getComplaintMapUrl } from 'utils/mapbox';
import { clayGray, darkSlateGrayColor, whiteTwoColor, accentColor } from 'utils/styles';

export const itemWidth = 232;

export const wrapperStyle = hovering => ({
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  border: `1px solid ${hovering ? accentColor : clayGray}`,
  backgroundColor: hovering ? '#454c59' : darkSlateGrayColor,
  display: 'block'
});

export const hoverableWrapperStyle = {
  width: `${itemWidth}px`,
  height: '298px',
  marginRight: '8px'
};

export const mapStyle = (lat, lon) => ({
  width: `${itemWidth}px`,
  height: '100px',
  background: `url("${getComplaintMapUrl(lat, lon, itemWidth, 100)}") no-repeat center/cover`
});

export const contentStyle = {
  padding: '0 16px',
  maxHeight: '178px',
  overflow: 'hidden',
  fontWeight: 200
};

export const sectionStyle = {
  padding: '10px 0 12px'
};

export const sectionWithBorderStyle = {
  borderBottom: `1px solid ${clayGray}`,
  padding: '10px 0 12px'
};

export const sectionLabelStyle = {
  color: whiteTwoColor,
  fontSize: '12px',
};

export const sectionContentStyle = {
  color: 'white',
  textOverflow: 'ellipsis',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

export const accusedStyle = {
  fontSize: '14px',
  color: whiteTwoColor,
  overflow: 'hidden'
};
