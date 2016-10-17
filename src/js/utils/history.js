import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from 'store';


const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export default history;
