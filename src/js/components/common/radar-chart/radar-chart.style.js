export const radarContaninerStyle = {
  backgroundColor: '#fdfaf2',
};

export const radarBoundaryAreaStyle = (boundaryAreaColor) => ({
  fill: boundaryAreaColor ? boundaryAreaColor : 'white',
  fillOpacity: boundaryAreaColor ? 1 : 0.6,
});
