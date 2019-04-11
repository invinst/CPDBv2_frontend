import { date, random } from 'faker';
import moment from 'moment';


/* istanbul ignore next */
export const dateGenerator = () => (moment(date.past()).format('YYYY-MM-DD'));
/* istanbul ignore next */
export const percentileGenerator = () => (random.number({ min: 10, max: 1000 }) / 10.0);
