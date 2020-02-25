import { date, random } from 'faker';
import moment from 'moment';

/* istanbul ignore next */
const _dateGenerator = () => date.between('1950-01-01', '1990-12-31');
/* istanbul ignore next */
export const dateGenerator = () => moment(_dateGenerator()).format('YYYY-MM-DD');
/* istanbul ignore next */
export const percentileGenerator = () => random.number({ min: 10, max: 1000 }) / 10.0;
/* istanbul ignore next */
export const yearGenerator = () => _dateGenerator().getFullYear();
