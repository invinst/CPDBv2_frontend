import { combineReducers } from 'redux';

import isPinButtonIntroductionVisited from './is-pinbutton-introduction-visited';
import isPinboardButtonIntroductionVisited from './is-pinboard-button-introduction-visited';
import isPinboardIntroductionVisited from './is-pinboard-introduction-visited';


export default combineReducers({
  isPinButtonIntroductionVisited,
  isPinboardButtonIntroductionVisited,
  isPinboardIntroductionVisited,
});
