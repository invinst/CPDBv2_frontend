import { map, some } from 'lodash';


export const hasEnoughRadarChartData = (items) => (
  !!items && items.length > 0 && !some(map(items, (d) => isNaN(d.value)))
);
